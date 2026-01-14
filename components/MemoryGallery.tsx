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
    title: 'First Birthday Celebration',
    description: 'The day we first celebrated together! So many wonderful memories.',
    date: '2020',
  },
  {
    id: 2,
    title: 'Adventure Time',
    description: 'Remember that amazing trip we took? Best times ever!',
    date: '2021',
  },
  {
    id: 3,
    title: 'Fun Moments',
    description: 'Laughing until our stomachs hurt. These moments are priceless.',
    date: '2022',
  },
  {
    id: 4,
    title: 'Special Day',
    description: 'Every moment with you is special. Here\'s to many more!',
    date: '2023',
  },
  {
    id: 5,
    title: 'Celebration',
    description: 'Dancing the night away. Pure joy and happiness!',
    date: '2024',
  },
  {
    id: 6,
    title: 'Together',
    description: 'Through thick and thin, always together. Forever friends!',
    date: '2024',
  },
];

export default function MemoryGallery({ memories = defaultMemories }: MemoryGalleryProps) {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  return (
    <section id="memories" className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Precious Memories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A journey through the beautiful moments we've shared together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 relative overflow-hidden">
                  {memory.image ? (
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📸
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {memory.date && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                      {memory.date}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{memory.title}</h3>
                  <motion.p
                    initial={{ height: 'auto' }}
                    animate={{
                      height: selectedMemory === memory.id ? 'auto' : '3em',
                    }}
                    className="text-gray-600 overflow-hidden"
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

