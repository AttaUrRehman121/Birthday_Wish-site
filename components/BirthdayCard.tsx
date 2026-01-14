'use client';

import { motion } from 'framer-motion';

interface BirthdayCardProps {
  message?: string;
  from?: string;
}

export default function BirthdayCard({ 
  message = 'Wishing you the most amazing birthday filled with love, laughter, and unforgettable moments!',
  from = 'With Love'
}: BirthdayCardProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Card */}
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl mb-6 text-center"
              >
                🎁
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                A Special Message
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8"
              >
                {message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-purple-600 font-semibold text-lg">
                  <span>{from}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ❤️
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating hearts */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              💖
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

