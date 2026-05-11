'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Wish {
  id: number;
  quote: string;
  author?: string;
}

interface WishesSectionProps {
  wishes?: Wish[];
}

const defaultWishes: Wish[] = [
  {
    id: 1,
    quote: 'May your special day be filled with endless joy, laughter, and all the happiness in the world!',
    author: 'With Love',
  },
  {
    id: 2,
    quote: 'Another year older, another year wiser, another year more amazing! Happy Birthday!',
  },
  {
    id: 3,
    quote: 'Wishing you a day that\'s as special and wonderful as you are!',
    author: 'Your Friends',
  },
  {
    id: 4,
    quote: 'May all your dreams come true and may you have the most incredible year ahead!',
  },
  {
    id: 5,
    quote: 'Here\'s to another year of adventures, growth, and beautiful memories!',
    author: 'Family',
  },
  {
    id: 6,
    quote: 'You bring so much light and joy to everyone around you. Have the happiest of birthdays!',
  },
  {
    id: 7,
    quote: 'May your birthday be the start of a year filled with good luck, good health, and much happiness!',
  },
  {
    id: 8,
    quote: 'Celebrate today knowing how loved and appreciated you are! Happy Birthday!',
  },
];

export default function WishesSection({ wishes = defaultWishes }: WishesSectionProps) {
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [wishes.length]);

  return (
    <section
      id="wishes"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {['🎈', '🎉', '🎊', '✨', '🌟'][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Birthday Wishes
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Heartfelt messages and wishes for your special day
          </p>
        </motion.div>

        {/* Main rotating wish card */}
        <div className="mb-16">
          <motion.div
            key={currentWishIndex}
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: -90 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-5xl sm:text-6xl mb-4 sm:mb-6"
              >
                💝
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 mb-4 leading-relaxed"
              >
                "{wishes[currentWishIndex].quote}"
              </motion.p>
              {wishes[currentWishIndex].author && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-purple-600 font-semibold"
                >
                  — {wishes[currentWishIndex].author}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {wishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWishIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentWishIndex
                    ? 'bg-purple-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid of all wishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setCurrentWishIndex(index)}
            >
              <div className="text-3xl mb-3">✨</div>
              <p className="text-gray-700 leading-relaxed">{wish.quote}</p>
              {wish.author && (
                <p className="text-sm text-purple-600 font-semibold mt-3">— {wish.author}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

