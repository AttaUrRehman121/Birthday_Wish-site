'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Memory {
  id: number;
  image?: string;
  title: string;
  description: string;
  date?: string;
}

interface MemoryGalleryProps {
  memories?: Memory[];
}

const defaultMemories: Memory[] = [
  {
    id: 1,
    image: '/m1.JPG',
    title: '',
    description: 'A friend is someone who knows all about you and still loves you anyway! 😂',
    date: '',
  },
  {
    id: 2,
    image: '/M2.jpeg',
    title: '',
    description: 'Friends don\'t let friends do stupid things... alone! We\'re in this together! 🤝',
    date: '',
  },
  {
    id: 3,
    image: '/M3.jpeg',
    title: '',
    description: 'Best friends: the people you can be weird with and they still think you\'re cool! 🎉',
    date: '',
  },
  {
    id: 4,
    image: '/m4.jpeg',
    title: '',
    description: 'Friendship is like peeing your pants. Everyone can see it, but only you can feel its warmth! 😄',
    date: '',
  },
  {
    id: 5,
    image: '/m5.jpeg',
    title: '',
    description: 'A true friend is someone who thinks you\'re a good egg even though they know you\'re slightly cracked! 🥚',
    date: '',
  },
  {
    id: 6,
    image: '/m6.jpeg',
    title: '',
    description: 'Friends are the family you choose, and we chose chaos! But hey, it\'s our chaos! 💫',
    date: '',
  },
  {
    id: 7,
    image: '/m7.jpeg',
    title: '',
    description: 'Real friends don\'t judge you when you\'re being extra. They join in! That\'s the real squad! 🔥',
    date: '',
  },
  {
    id: 8,
    image: '/m8.jpeg',
    title: '',
    description: 'Friendship: where "I\'m fine" means "I need you" and "whatever" means "I love you"! 💕',
    date: '',
  },
];

export default function MemoryGallery({ memories = defaultMemories }: MemoryGalleryProps) {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <section
      id="memories"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-indigo-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Precious Memories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A journey through the beautiful moments we've shared together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full transform transition-all duration-300">
                {/* Image placeholder or gradient */}
                <div className="h-80 sm:h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 relative overflow-hidden">
                  {memory.image ? (
                    <img
                      src={memory.image}
                      alt="Memory"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📸
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <motion.p
                    initial={{ height: 'auto' }}
                    animate={{
                      height: selectedMemory === memory.id ? 'auto' : '3em',
                    }}
                    className="text-gray-700 text-center leading-relaxed overflow-hidden"
                  >
                    {memory.description}
                  </motion.p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

