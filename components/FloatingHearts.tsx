'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

type FloatingHeartsProps = {
  count?: number;
  className?: string;
};

type Heart = {
  id: number;
  leftPct: number;
  topPct: number;
  sizePx: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
};

const EMOJIS = ['💖', '💕', '✨', '🌸', '⭐', '🦋'];

export default function FloatingHearts({ count = 18, className }: FloatingHeartsProps) {
  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        leftPct: Math.random() * 100,
        topPct: Math.random() * 100,
        sizePx: 18 + Math.random() * 18,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 2,
        emoji: EMOJIS[i % EMOJIS.length],
        opacity: 0.12 + Math.random() * 0.22,
      })),
    [count]
  );

  return (
    <div className={className ?? 'absolute inset-0 pointer-events-none overflow-hidden'}>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.leftPct}%`,
            top: `${h.topPct}%`,
            fontSize: `${h.sizePx}px`,
            opacity: h.opacity,
            filter: 'blur(0.1px)',
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 10, -8, 0],
            rotate: [0, 10, -10, 0],
            opacity: [h.opacity, Math.min(0.45, h.opacity + 0.18), h.opacity],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}


