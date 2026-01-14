'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  name?: string;
  age?: number;
  birthdayDate?: string;
  isTodayBirthday?: boolean;
  onCelebrateClick?: () => void;
}

export default function HeroSection({ name = 'Birthday Star', age, birthdayDate, isTodayBirthday = false, onCelebrateClick }: HeroSectionProps) {
  const [showCake, setShowCake] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCake(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Format date for display (e.g., "JAN·15·2025")
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split(' ');
    const month = parts[0].substring(0, 3).toUpperCase();
    const day = parts[1];
    // Use current year for display
    const year = new Date().getFullYear();
    return `${month}·${day}·${year}·`;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-400 overflow-hidden pt-24 md:pt-28"
    >
      {/* Animated Background Blur Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-pink-300/40 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-300/40 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
        {/* Confetti-like dashes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-4 bg-pink-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          
          {/* Left Section - Circular Background with Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center md:justify-start mb-10 md:mb-0"
          >
            {/* Large Circular Background */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-square">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-400/80 to-purple-600/80 rounded-full backdrop-blur-sm shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
                }}
              />
              
              {/* Content on Circle */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-8 py-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-pink-200 mb-1 sm:mb-2"
                >
                  HAPPY
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-1 sm:mb-2"
                >
                  BIRTHDAY
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-5 sm:mb-6"
                >
                  TO {name.toUpperCase()}
                </motion.div>

                {/* 3D Podium + Cake (click to light candles) */}
                {showCake && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, type: 'spring' }}
                    className="relative mt-4"
                  >
                    <button
                      type="button"
                      onClick={() => setCandlesLit((prev) => !prev)}
                      className="relative w-24 h-16 bg-white/90 rounded-t-full shadow-lg flex items-end justify-center outline-none border-none cursor-pointer"
                      style={{
                        transform: 'perspective(500px) rotateX(10deg)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Candle flames */}
                      {candlesLit && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              // eslint-disable-next-line react/no-array-index-key
                              key={i}
                              className="w-2 h-4 rounded-full"
                              style={{
                                background:
                                  'radial-gradient(circle at 30% 0%, #fff7b2 0%, #fed7aa 40%, #fb923c 70%, transparent 100%)',
                              }}
                              animate={{
                                y: [0, -2, 0],
                                scaleY: [1, 1.2, 1],
                                opacity: [0.9, 1, 0.9],
                              }}
                              transition={{
                                duration: 0.6 + i * 0.1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          ))}
                        </div>
                      )}
                      {/* Cake emoji */}
                      <motion.span
                        className="text-6xl pb-1"
                        animate={
                          candlesLit
                            ? {
                                scale: [1, 1.04, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          repeat: candlesLit ? Infinity : 0,
                          repeatDelay: 1.2,
                          ease: 'easeInOut',
                        }}
                      >
                        🎂
                      </motion.span>
                    </button>
                  </motion.div>
                )}

                {/* Call to Action */}
                <motion.a
                  href="#memories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-sm md:text-base font-light text-pink-200 hover:text-white transition-colors cursor-pointer"
                >
                  VIEW MEMORIES →
                </motion.a>
              </div>

              {/* 3D Spheres around circle */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/30 backdrop-blur-sm"
                  style={{
                    width: `${40 + i * 15}px`,
                    height: `${40 + i * 15}px`,
                    left: `${10 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Section - Date and CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center md:items-start space-y-6 mt-4 md:mt-0"
          >
            {/* Date Display */}
            {birthdayDate && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wider text-center md:text-left"
              >
                {formatDateForDisplay(birthdayDate)}
              </motion.div>
            )}

            {/* Age Display */}
            {age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-5xl sm:text-6xl md:text-8xl font-bold text-white"
              >
                {age}
              </motion.div>
            )}

            {/* Main CTA Button */}
            <motion.button
              onClick={onCelebrateClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-purple-600/90 backdrop-blur-sm rounded-2xl text-white font-semibold text-base sm:text-lg shadow-xl hover:bg-purple-700/90 transition-all cursor-pointer"
            >
              LET&apos;S CELEBRATE
            </motion.button>

            {/* Today is Birthday Badge */}
            {isTodayBirthday && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="flex items-center gap-2 bg-yellow-400/90 backdrop-blur-sm px-4 py-2 rounded-full mt-2"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-xl"
                >
                  🎉
                </motion.span>
                <span className="text-sm font-semibold text-purple-900">
                  Today is Your Special Day!
                </span>
              </motion.div>
            )}

            {/* Secondary Actions */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-light border border-white/30 hover:bg-white/30 transition-all"
              >
                READ MORE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Balloons in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${70 + i * 5}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            <div className="w-16 h-20 bg-gradient-to-b from-purple-400/60 to-purple-600/60 rounded-full shadow-lg" 
              style={{
                clipPath: 'ellipse(50% 60% at 50% 40%)',
              }}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-white/30" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
