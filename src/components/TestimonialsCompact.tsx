'use client';

import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const topTestimonials = [
  {
    name: '이○○ 선생님',
    role: '장흥초등학교 교사',
    content: '"선생님의 강의를 들어보니 조금만 관심을 갖고 찾아보면 나도 나만의 수업브랜드를 만들고 학생성장이라는 이상을 구체적인 현실로 만들 수 있을 것 같다는 용기와 확신이 생겼습니다. 다양한 에듀테크뿐 아니라 이를 활용할 수 있는 실제 사례를 보여주셔서 감사합니다."',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포영산초등학교 교사',
    content: '"오늘 연수에서 배운 글쓰기 관련 에듀테크 활용법들이 제 고민을 해결하는 데 큰 도움이 되었습니다. 다가올 2학기에는 이 도구들을 실제 수업에 적극적으로 활용해서, 아이들의 문해력과 글쓰기 실력을 키워주고 싶습니다."',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '남악초등학교 교사',
    content: '"학생들에게 글쓰기 지도부터 출판까지 정말 쉬운 일이 아닐 텐데, 진심으로 지도하시는 선생님보며 정말 존경스럽다는 생각했습니다. 저도 선생님처럼 끊임없이 기록하고 항상 학생들을 위해 고민하는 교사가 되고 싶어요~"',
    rating: 5,
  },
];

export default function TestimonialsCompact() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('연수 후기', 'Training Reviews')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t(
              '엽쌤의 연수에 참여하신 선생님들의 소감입니다.',
              'Feedback from teachers who attended YeopSsaem\'s training sessions.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTestimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 break-keep line-clamp-5">
                {item.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-brand-navy dark:text-brand-sky" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
