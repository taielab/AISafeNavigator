"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import { cn } from "@/lib/utils";

interface MarkdownProseProps {
  markdown: string;
  className?: string;
  allowHtml?: boolean;
}

const MarkdownProse = React.memo(({ 
  markdown, 
  className,
  allowHtml = false 
}: MarkdownProseProps) => {
  return (
    <article 
      className={cn(
        "prose prose-gray max-w-none",
        "prose-headings:mb-3 prose-headings:mt-6 prose-headings:text-gray-900",
        "prose-p:my-2 prose-p:leading-relaxed prose-p:text-gray-600",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:bg-gray-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-800",
        "prose-ul:text-gray-600 prose-ol:text-gray-600",
        "prose-strong:text-gray-900 prose-em:text-gray-700",
        "prose-blockquote:border-gray-200 prose-blockquote:text-gray-600",
        className
      )}
    >
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          a: ({ node, ...props }) => (
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              className="transition-colors duration-200"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img 
              loading="lazy"
              className="rounded-lg shadow-sm" 
              {...props}
            />
          )
        }}
      >
        {markdown}
      </Markdown>
    </article>
  );
});

MarkdownProse.displayName = "MarkdownProse";

export default MarkdownProse;
