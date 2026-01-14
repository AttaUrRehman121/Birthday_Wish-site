'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type PasswordModalProps = {
  open: boolean;
  password: string;
  onClose: () => void;
  onSuccess: () => void;
};

function clampStr(s: string, len: number) {
  return s.length > len ? s.slice(0, len) : s;
}

export default function PasswordModal({ open, password, onClose, onSuccess }: PasswordModalProps) {
  const maxLen = Math.max(4, Math.min(8, password.length));
  const [pin, setPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  const keys = useMemo(() => ['1','2','3','4','5','6','7','8','9','⌫','0','OK'], []);

  useEffect(() => {
    if (!open) return;
    setPin('');
    setErrorShake(false);
  }, [open]);

  function submit(nextPin: string) {
    if (nextPin === password) {
      onSuccess();
      return;
    }
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 450);
    setPin('');
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="text-xl font-bold">🔐 Secret Diary</div>
              <div className="text-sm text-white/90 mt-1">
                Enter the password to unlock (unique PIN style).
              </div>
            </div>

            <motion.div
              className="p-6"
              animate={errorShake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center justify-center gap-2 mb-5">
                {Array.from({ length: maxLen }).map((_, i) => {
                  const filled = i < pin.length;
                  return (
                    <div
                      key={i}
                      className={`h-3.5 w-3.5 rounded-full border ${
                        filled ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {keys.map((k) => (
                  <button
                    key={k}
                    className={`rounded-2xl py-4 text-lg font-semibold shadow-sm border ${
                      k === 'OK'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent'
                        : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      if (k === '⌫') {
                        setPin((p) => p.slice(0, -1));
                        return;
                      }
                      if (k === 'OK') {
                        submit(pin);
                        return;
                      }
                      setPin((p) => clampStr(p + k, maxLen));
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="text-purple-700 font-semibold hover:text-purple-900"
                  onClick={() => submit(pin)}
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



