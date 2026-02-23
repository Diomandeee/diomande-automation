import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";

const AI_ENABLED = process.env.NEXT_PUBLIC_CHAT_AI_ENABLED === "true";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MAX_MESSAGES_PER_SESSION = 10;

// Simple rate limiting via cookie
function getSessionCount(req: NextRequest): number {
  const cookie = req.cookies.get("claw_chat_count");
  return cookie ? parseInt(cookie.value, 10) || 0 : 0;
}

// Serialize projects for system prompt (~3KB)
const projectSummary = projects
  .map(
    (p) =>
      `- ${p.name} (${p.slug}): ${p.tagline}. Tech: ${p.tech.join(", ")}. Tags: ${p.tags.join(", ")}. Category: ${p.category}. Maturity: ${p.maturity}.`
  )
  .join("\n");

const systemPrompt = `You are Claw, the AI mesh assistant for Diomande Automation. You are direct, slightly snarky, and always include actionable information.

You help visitors learn about the ${projects.length} projects built with the mesh. When mentioning projects, always include the slug in brackets like [project-slug] so the frontend can link them.

Here are all projects:
${projectSummary}

Rules:
- Be concise (2-4 sentences max)
- Always link to relevant projects using [slug] notation
- If asked about the mesh: it's 5 devices (3 Macs, VMs, a laptop) connected via Tailscale, running Claude/Gemini/Codex with 3-model fallback
- If you don't know something, say so directly — don't make things up
- Mo (Mohamed Diomande) is the builder`;

export async function POST(req: NextRequest) {
  if (!AI_ENABLED || !ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI chat is not enabled. Set NEXT_PUBLIC_CHAT_AI_ENABLED=true and provide ANTHROPIC_API_KEY." },
      { status: 503 }
    );
  }

  const count = getSessionCount(req);
  if (count >= MAX_MESSAGES_PER_SESSION) {
    return NextResponse.json(
      { error: "Session limit reached. Refresh to start a new session." },
      { status: 429 }
    );
  }

  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-20250414",
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: "user", content: message }],
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.text
                  ) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`)
                    );
                  }
                } catch {
                  // skip malformed JSON
                }
              }
            }
          }
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    const res = new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    // Increment session counter
    res.cookies.set("claw_chat_count", String(count + 1), {
      maxAge: 3600, // 1 hour session
      httpOnly: true,
      sameSite: "strict",
    });

    return res;
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
