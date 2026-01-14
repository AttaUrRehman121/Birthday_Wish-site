'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SprinklePiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  delay: number;
  size: number;
  horizontalDrift: number;
  rotationSpeed: number;
}

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#FFB6C1', '#FFD700', '#FF69B4', '#9370DB', '#FF1493', '#00CED1'];

export default function SprinkleAnimation() {
  const [sprinkles, setSprinkles] = useState<SprinklePiece[]>([]);

  useEffect(() => {
    const pieces: SprinklePiece[] = [];
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    
    for (let i = 0; i < 120; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 50, // Start from different heights above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 1.5, // Staggered delays for more natural effect
        size: 3 + Math.random() * 5, // Smaller, more realistic sizes
        horizontalDrift: (Math.random() - 0.5) * 30, // Horizontal drift like wind
        rotationSpeed: 180 + Math.random() * 360, // Slower, more natural rotation
      });
    }
    setSprinkles(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {sprinkles.map((piece) => {
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
        const fallDistance = windowHeight + 150;
        
        return (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: piece.size < 4 ? '50%' : '30%', // Smaller ones are rounder
              boxShadow: `0 0 ${piece.size * 0.8}px ${piece.color}`,
            }}
            initial={{ 
              y: piece.y, 
              x: 0,
              rotate: piece.rotation, 
              opacity: 0,
              scale: 0.3 
            }}
            animate={{
              y: fallDistance,
              x: piece.horizontalDrift, // Horizontal drift for realism
              rotate: piece.rotation + piece.rotationSpeed, // Natural rotation
              opacity: [0, 1, 1, 0.9, 0.7, 0], // Gradual fade
              scale: [0.3, 1, 1, 1, 0.8, 0.5], // Scale up then fade
            }}
            transition={{
              duration: 4 + Math.random() * 3, // Slower: 4-7 seconds
              delay: piece.delay,
              ease: [0.42, 0, 0.58, 1], // More natural gravity-like easing
            }}
          />
        );
      })}
    </div>
  );
}

