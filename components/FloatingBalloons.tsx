'use client';

import { motion } from 'framer-motion';

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export default function FloatingBalloons() {
  const balloons: Balloon[] = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: balloonColors[i % balloonColors.length],
    delay: i * 0.3,
    size: 40 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
            bottom: '-100px',
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? -window.innerHeight - 200 : -1000,
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 5,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <motion.div
            className="relative"
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
            }}
            animate={{
              x: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Balloon */}
            <div
              className="rounded-full"
              style={{
                width: '100%',
                height: '80%',
                backgroundColor: balloon.color,
                boxShadow: 'inset -10px -10px 0px rgba(0,0,0,0.1)',
              }}
            />
            {/* String */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              style={{
                width: '2px',
                height: '20%',
                backgroundColor: '#333',
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

