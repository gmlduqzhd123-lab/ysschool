"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f1d3d 0%, #1a2f5e 40%, #162a52 100%)" }}
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
        >
          <Sparkles className="h-4 w-4 text-sky-300" />
          <span className="text-sm font-medium text-sky-200">
            Collaboration
          </span>
        </motion.div>

        {/* Main copy */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
        >
          미래 교육을 향한 끝없는 도전,
          <br />
          <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            엽쌤과 함께 하실래요?
          </span>
        </motion.h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          강의, 교사 연수, 에듀테크 컨설팅 및 다양한 협업 제안을 환영합니다.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <a
            href="mailto:test@gmail.com"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Glow effect behind button */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
            <Mail className="h-6 w-6 relative z-10" />
            <span className="relative z-10">✉️ 엽쌤에게 메일 보내기</span>
          </a>
        </motion.div>

        {/* Subtle bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-3 text-slate-500 text-sm"
        >
          <span className="w-12 h-px bg-slate-600" />
          <span>gmlduqzhd@naver.com · KakaoTalk: yeop24</span>
          <span className="w-12 h-px bg-slate-600" />
        </motion.div>
      </div>
    </section>
  );
}
