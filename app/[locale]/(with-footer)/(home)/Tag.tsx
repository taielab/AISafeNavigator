'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface TagProps {
  id: number;
  name: string;
  title: string;
}

interface TagListProps {
  list: TagProps[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TagList({ list, className }: TagListProps) {
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <motion.div
      className={cn('flex flex-wrap items-center gap-3', className)}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {list.map((tag) => (
        <motion.div key={tag.id} variants={item}>
          <Link
            href={`/category/${tag.name}`}
            className={cn(
              'inline-flex items-center rounded-full px-4 py-1.5',
              'bg-gray-50 text-sm text-gray-600',
              'transition-all duration-200',
              'hover:bg-primary/5 hover:text-primary',
              'focus:outline-none focus:ring-2 focus:ring-primary/20'
            )}
          >
            {tag.title || tag.name}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}