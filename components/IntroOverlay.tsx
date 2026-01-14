'use client';

import { AnimatePresence, motion } from 'framer-motion';

import FloatingHearts from '@/components/FloatingHearts';

type IntroOverlayProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onEnter: () => void;
};

export default function IntroOverlay({
  open,
  title,
  subtitle = "Hey you… today is someone’s special day.",
  buttonText = 'Click to Enter Our World 💕',
  onEnter,
}: IntroOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f3d7ff] via-[#c7c1ff] to-[#9db7ff]" />
          <motion.div
            className="absolute inset-0 opacity-70"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55), transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35), transparent 35%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.35), transparent 35%)',
              backgroundSize: '140% 140%',
            }}
          />

          <FloatingHearts className="absolute inset-0 pointer-events-none overflow-hidden" />

          {/* card */}
          <motion.div
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 16 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white/16 backdrop-blur-xl border border-white/30 shadow-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-5xl mb-5"
            >
              🎂
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow">
              {title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90">{subtitle}</p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-full bg-white text-[#4b3b86] font-semibold shadow-lg hover:shadow-xl transition"
              >
                {buttonText}
              </motion.button>
            </div>

            <div className="mt-6 text-white/70 text-sm">
              Tip: you can reuse this intro for any birthday — just change the props.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


