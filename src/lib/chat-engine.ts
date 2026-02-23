import { projects } from "@/data/projects";
import { chatPatterns, type ChatResponse } from "@/data/chat-responses";

const fallbacks = [
  "Not sure I follow. Try asking about a specific project, tech stack, or how the mesh works.",
  "I'm better with specifics. Ask about a project name, a technology, or what connects things together.",
  "Hmm, that one's outside my range. Try: 'Show me the Rust projects' or 'How does the mesh work?'",
  "Didn't catch that. I know about all ${count} projects — ask me about one by name, tech, or category.",
];

export function getResponse(input: string): ChatResponse {
  const trimmed = input.trim();
  if (!trimmed) {
    return { text: "Type something. I'm listening." };
  }

  // Try pattern matching first
  for (const { pattern, handler } of chatPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return handler(match);
    }
  }

  // Fuzzy project name search
  const lower = trimmed.toLowerCase();
  const nameMatch = projects.find(
    (p) =>
      lower.includes(p.name.toLowerCase()) ||
      lower.includes(p.slug.replace(/-/g, " "))
  );
  if (nameMatch) {
    return {
      text: `${nameMatch.name} — ${nameMatch.tagline}. ${nameMatch.description}. Built with ${nameMatch.tech.join(", ")}. Status: ${nameMatch.maturity}.`,
      projects: [nameMatch.slug],
    };
  }

  // Fuzzy tech search
  const techMatch = projects.filter((p) =>
    p.tech.some((t) => lower.includes(t.toLowerCase()))
  );
  if (techMatch.length > 0) {
    const matchedTech = techMatch[0].tech.find((t) =>
      lower.includes(t.toLowerCase())
    )!;
    return {
      text: `${techMatch.length} project${techMatch.length > 1 ? "s" : ""} using ${matchedTech}: ${techMatch.map((p) => p.name).join(", ")}.`,
      projects: techMatch.map((p) => p.slug),
    };
  }

  // Fuzzy tag search
  const tagMatch = projects.filter((p) =>
    p.tags.some((t) => lower.includes(t.toLowerCase()))
  );
  if (tagMatch.length > 0) {
    const matchedTag = tagMatch[0].tags.find((t) =>
      lower.includes(t.toLowerCase())
    )!;
    return {
      text: `${tagMatch.length} project${tagMatch.length > 1 ? "s" : ""} tagged "${matchedTag}": ${tagMatch.map((p) => p.name).join(", ")}.`,
      projects: tagMatch.map((p) => p.slug),
    };
  }

  // Fallback
  const fallback =
    fallbacks[Math.floor(Math.random() * fallbacks.length)].replace(
      "${count}",
      String(projects.length)
    );
  return { text: fallback };
}
