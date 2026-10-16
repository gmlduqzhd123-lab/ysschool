'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Gamepad2, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    id: 'teacher',
    icon: GraduationCap,
    label: '선생님이신가요?',
    desc: '수업 자료 · 연수 강의안 · 교실 도구',
    href: '/training',
    color: 'from-blue-500 to-indigo-600',
    hoverBorder: 'hover:border-blue-400',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'student',
    icon: Gamepad2,
    label: '학생이에요!',
    desc: '배움게임 PIN 입력 · AI 놀이터',
    href: '/showcase#learning-games',
    color: 'from-emerald-500 to-teal-600',
    hoverBorder: 'hover:border-emerald-400',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'parent',
    icon: Users,
    label: '학부모입니다',
    desc: '급식 확인 · 교육 블로그 · 출간 도서',
    href: '/morning',
    color: 'from-amber-500 to-orange-600',
    hoverBorder: 'hover:border-amber-400',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
];

export default function RoleSelector() {
  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={role.href}
                  className={`group relative flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg ${role.hoverBorder} dark:hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className={`shrink-0 w-11 h-11 rounded-xl ${role.iconBg} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{role.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{role.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
