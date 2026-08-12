'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 세션 내 1회만 표시
    const shown = sessionStorage.getItem('ysschool-splash-shown');
    if (!shown) {
      requestAnimationFrame(() => setShow(true));
      sessionStorage.setItem('ysschool-splash-shown', 'true');
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(56, 189, 248, 0.3)',
                  '0 0 60px rgba(56, 189, 248, 0.6)',
                  '0 0 20px rgba(56, 189, 248, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-brand-navy p-5 rounded-2xl"
            >
              <BookOpen className="h-12 w-12 text-white" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-bold text-4xl text-white tracking-tight mb-2">
                YSSCHOOL
              </h1>
              <p className="text-brand-sky/80 text-sm font-medium tracking-widest uppercase">
                경계를 넘어서는 교육
              </p>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-1.5 mt-4"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-brand-sky"
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
