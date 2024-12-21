import { cn } from '@/lib/utils';

interface PriceItemProps {
  title: string;
  isFree: boolean;
}

export default function PriceItem({ title, isFree }: PriceItemProps) {
  return (
    <div
      className={`flex-center h-7 w-fit rounded-lg px-3 text-sm font-medium transition-colors duration-200 ${
        isFree
          ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
          : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
      }`}
    >
      {title}
    </div>
  );
}
