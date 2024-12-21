"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import MarkdownProse from "./MarkdownProse";

interface FaqProps {
  className?: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = React.memo(({ question, answer, isOpen, onToggle }: FaqItemProps) => (
  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors duration-200 hover:bg-gray-50">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 p-4 text-left"
      aria-expanded={isOpen}
    >
      <h3 className="text-base font-semibold text-gray-900 lg:text-lg">
        {question}
      </h3>
      <ChevronDown 
        className={cn(
          "size-5 flex-shrink-0 text-gray-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="border-t border-gray-100 px-4 py-4">
        <MarkdownProse 
          markdown={answer} 
          className="prose-sm text-gray-600 lg:prose-base"
        />
      </div>
    </div>
  </div>
));

FaqItem.displayName = "FaqItem";

const Faq = React.memo(({ className }: FaqProps) => {
  const t = useTranslations("Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: t("1.question"),
      answer: t("1.answer"),
    },
    {
      question: t("2.question"),
      answer: [t("2.answer-1"), t("2.answer-2"), t("2.answer-3")].join("\n"),
    },
    {
      question: t("3.question"),
      answer: [t("3.answer-1"), t("3.answer-2")].join("\n"),
    },
    {
      question: t("4.question"),
      answer: t("4.answer"),
    },
    {
      question: t("5.question"),
      answer: t("5.answer"),
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-center text-2xl font-semibold text-gray-900 lg:text-3xl">
        {t("title")}
      </h2>
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
});

Faq.displayName = "Faq";

export default Faq;
