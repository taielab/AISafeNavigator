import { cn } from "@/lib/utils";

interface TagItemProps {
  name?: string;
  title?: string;
  className?: string;
}

export default function TagItem({ name, title, className = "" }: TagItemProps) {
  const displayText = title || name;
  
  if (!displayText) return null;
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600",
        "dark:bg-gray-800 dark:text-gray-400",
        className
      )}
    >
      {displayText}
    </span>
  );
} 