"use client";

import { useMemo } from "react";

interface DocRendererProps {
  content: string;
}

export function DocRenderer({ content }: DocRendererProps) {
  const html = useMemo(() => {
    // Simple markdown to HTML conversion for MDX content
    let result = content;

    // Headers
    result = result.replace(/^### (.+)$/gm, '<h3 id="$1" class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>');
    result = result.replace(/^## (.+)$/gm, '<h2 id="$1" class="text-2xl font-bold text-white mt-12 mb-4">$1</h2>');

    // Code blocks
    result = result.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_, lang, code) =>
        `<div class="rounded-xl overflow-hidden border border-white/8 my-6">
          ${lang ? `<div class="px-4 py-2 bg-white/[0.03] border-b border-white/5"><span class="text-xs text-[#6b6b80] font-[family-name:var(--font-mono)]">${lang}</span></div>` : ""}
          <pre class="p-4 overflow-x-auto bg-[#0d0d14]"><code class="text-sm text-[#a0a0b8] font-[family-name:var(--font-mono)] leading-relaxed">${code.trim()}</code></pre>
        </div>`
    );

    // Inline code
    result = result.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-white/5 text-[#00d4ff] text-sm font-[family-name:var(--font-mono)]">$1</code>'
    );

    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

    // Lists
    result = result.replace(
      /^- (.+)$/gm,
      '<li class="flex items-start gap-2 text-[#a0a0b8] mb-2"><span class="text-[#00d4ff] mt-1.5 shrink-0">•</span><span>$1</span></li>'
    );

    // Wrap consecutive li elements in ul
    result = result.replace(
      /(<li[\s\S]*?<\/li>\n?)+/g,
      '<ul class="my-4 space-y-1">$&</ul>'
    );

    // Numbered lists
    result = result.replace(
      /^\d+\. (.+)$/gm,
      '<li class="text-[#a0a0b8] mb-2 ml-6 list-decimal">$1</li>'
    );

    // Paragraphs (lines that aren't already HTML)
    result = result.replace(
      /^(?!<[a-z])((?!^\s*$).+)$/gm,
      '<p class="text-[#a0a0b8] leading-relaxed mb-4">$1</p>'
    );

    // Clean up empty paragraphs
    result = result.replace(/<p[^>]*>\s*<\/p>/g, "");

    return result;
  }, [content]);

  return (
    <div
      className="doc-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
