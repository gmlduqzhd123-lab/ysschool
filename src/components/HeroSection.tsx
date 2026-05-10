'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-brand-sky/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-brand-navy/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/10 text-brand-navy dark:text-brand-sky font-semibold text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>에듀테크 크리에이터</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
              경계를 넘어서는 교육, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-sky">
                엽쌤스쿨
              </span>에 오신 것을 환영합니다.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              교육, 개발, 그리고 집필까지. <br className="hidden sm:block" />
              끝없이 도전하는 에듀테크 크리에이터 엽쌤의 모든 것.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#about"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-brand-navy text-white font-semibold hover:bg-brand-navy/90 transition-all shadow-lg hover:shadow-brand-navy/30"
              >
                엽쌤 스토리 보기
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#web-app-lab"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-brand-navy dark:text-white font-semibold border-2 border-brand-navy/10 hover:border-brand-sky transition-all shadow-sm hover:shadow-md"
              >
                최신 웹앱 체험하기
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Decorative shapes behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky to-brand-orange rounded-[3rem] rotate-6 opacity-20 blur-lg mix-blend-multiply dark:mix-blend-lighten"></div>
              <div className="absolute inset-0 bg-brand-navy rounded-[3rem] -rotate-6 transition-transform hover:rotate-0 duration-500"></div>
              
              <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border-4 border-white/50 dark:border-slate-700 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800"
                  alt="엽쌤 프로필"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
