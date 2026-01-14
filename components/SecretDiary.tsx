'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DiaryFlipbook, { type DiaryPage } from '@/components/diary/DiaryFlipbook';
import PasswordModal from '@/components/diary/PasswordModal';

type SecretDiaryProps = {
  /** 4-8 digit pin recommended */
  password?: string;
  title?: string;
  subtitle?: string;
  pages?: DiaryPage[];
};

export default function SecretDiary({
  password = '1501',
  title = 'Happy Birthday',
  subtitle = 'Wish You All The Best',
  pages,
}: SecretDiaryProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const diaryPages = useMemo<DiaryPage[]>(
    () =>
      pages ??
      Array.from({ length: 10 }).map((_, i) => ({
        id: `p${i + 1}`,
        title: `Memory ${i + 1}`,
        quote:
          [
            'Some people make the world brighter just by being in it.',
            'Here’s to the laughs, the chaos, and the unforgettable moments.',
            'You deserve every good thing this year can bring.',
            'A page full of smiles—because you’re the reason.',
            'Keep shining. Keep dreaming. Keep being you.',
          ][i % 5] + ' ✨',
        image: null, // replace with `/your-image.jpg` from /public
      })),
    [pages]
  );

  return (
    <section id="diary" className="py-20 px-4 bg-gradient-to-b from-indigo-50 via-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Secret Diary
          </h2>
          <p className="mt-3 text-gray-600">A private little book: photos + quotes (password protected).</p>
        </motion.div>

        {/* Cover */}
        {!unlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-md"
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-black/10 bg-[#fff7ef]">
              {/* confetti border */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-16 diary-confetti-top" />
                <div className="absolute bottom-0 left-0 right-0 h-20 diary-confetti-bottom" />
                <div className="absolute left-0 top-0 bottom-0 w-10 diary-confetti-left" />
                <div className="absolute right-0 top-0 bottom-0 w-10 diary-confetti-right" />
              </div>

              {/* bunting */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                {['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'].map((c, i) => (
                  <div
                    key={i}
                    className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent"
                    style={{ borderTopColor: c }}
                  />
                ))}
              </div>

              <div className="relative p-8 pt-16 pb-14">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <div className="text-4xl md:text-5xl font-extrabold tracking-wide text-[#1f3b82]">
                    {title.toUpperCase()}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1f3b82]/80">{subtitle}</div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 items-center">
                  <div className="rounded-2xl bg-white shadow-md p-4 flex items-center justify-center">
                    <div className="text-5xl">🎂</div>
                  </div>
                  <div className="rounded-2xl bg-white shadow-md p-4 flex items-center justify-center">
                    <div className="text-5xl">🎁</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="inline-flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-[#7c3aed]">Click to view</span>
                    <span>🔒</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setModalOpen(true)}
                    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 shadow-lg"
                  >
                    OPEN DIARY
                  </motion.button>
                </div>
              </div>
            </div>

            <PasswordModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              password={password}
              onSuccess={() => {
                setModalOpen(false);
                setUnlocked(true);
                setTimeout(() => {
                  const el = document.getElementById('diary');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
            />
          </motion.div>
        )}

        {/* Flipbook */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              key="flipbook"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <DiaryFlipbook pages={diaryPages} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}



