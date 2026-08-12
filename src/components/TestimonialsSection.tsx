'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, ChevronLeft, ChevronRight, Star, PenLine, Trash2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: '이○○ 선생님',
    role: '영광초등학교 교사',
    content: '항상 AI 관련 연수와 교실 내 활용 방법을 알고 싶어했는데 이번 기회에 아주 많은 에듀테크를 알아갈 수 있어서 너무 감사드립니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포에항초등학교 교사',
    content: '다양한 인공지능 플랫폼을 알 수 있었고, 선생님께서 직접 겪어온 이야기들을 바탕으로 진행해주셔서 졸리지 않고 더욱 집중이 잘 되었습니다. 감사합니다!',
    rating: 5,
  },
  {
    name: '임○○ 선생님',
    role: '목포동초등학교 교사',
    content: '\'부크크\'라는 에듀테크를 활용해 아이들이 직접 작성한 글을 책으로 묶어 낼 수 있다는 것을 새롭게 알게 되었습니다. 선생님께서 보여주신 사례들을 통해 책 출판뿐만 아니라 학생의 성장을 도모할 수 있는 학습인 것 같습니다. 저 또한 학생들과 함께 성장할 기회인 것 같습니다. 좋은 수업 감사합니다.',
    rating: 5,
  },
  {
    name: '선생님',
    role: '목포연산초등학교 교사',
    content: '에듀테크는 단순히 디지털 기기를 활용하는 것이 아니라 학생 개개인의 수준과 특성에 맞는 맞춤형 학습을 지원하고, 학습 과정과 성장을 지속적으로 확인할 수 있는 도구라는 점을 새롭게 알게 되었습니다. 학생의 깊은 마음을 글로 끌어낼 수 있는 수업 사례를 보면서 굉장히 많은 배움을 얻었습니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '현경북초등학교 교사',
    content: '다양한 재밌는 게임들이 너무 기억에 남아요! 재밌었어요 😊',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '광양동초등학교 교사',
    content: '학급 문집을 만들고 싶었는데 부크크라는 좋은 프로그램을 알게 되어 너무나 유익했습니다!! 선생님께서 하셨던 것처럼 프로젝트 형태로 학생들의 글을 토대로 책을 내는 경험도 도전해보고 싶습니다. 교사로서도, 학생에게도, 깊은 추억이 될 것 같아요.',
    rating: 5,
  },
  {
    name: '장○○ 선생님',
    role: '목포서부초등학교 교사',
    content: '자작자작과 같은 에듀테크를 많이 알아가는 시간이어서 좋았다.',
    rating: 5,
  },
  {
    name: '윤○○ 선생님',
    role: '목포백련초등학교 교사',
    content: '자작자작을 활용해 학생들의 글쓰기 능력을 기를 수 있을지 알게 된 것 같습니다. 처음에는 400자에서, 나중에 능동적으로 길게 글을 쓰게 되는 학생까지 생긴 것을 보고 지속적으로 수준을 높여 지도하는 것의 중요성을 느꼈습니다. 책과 글쓰기를 활용한 수업과 많은 에듀테크 프로그램까지 알 수 있었던 알찬 강의였습니다. 감사합니다!',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '남악초등학교 교사',
    content: '학생들에게 글쓰기 지도부터 출판까지 정말 쉬운 일이 아닐 텐데, 진심으로 지도하시는 선생님보며 정말 존경스럽다는 생각했습니다. 저도 선생님처럼 끊임없이 기록하고 항상 학생들을 위해 고민하는 교사가 되고 싶어요~ 너무 고생 많으셨습니다!',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포영산초등학교 교사',
    content: '오늘 연수에서 배운 글쓰기 관련 에듀테크 활용법들이 제 고민을 해결하는 데 큰 도움이 되었습니다. 이제는 아이들의 가장 시급한 문제인 \'쓰기 능력\'을 키워주는 데 써야겠다는 확실한 목표가 생겼습니다. 다가올 2학기에는 이 도구들을 실제 수업에 적극적으로 활용해서, 아이들의 문해력과 글쓰기 실력을 키워주고 싶습니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포서산초등학교 교사',
    content: '다양한 수업 활용도구들을 알게 되어서 좋아요(자작자작, 투닝, 부크크, 겟지피티 등등). 교사가 아는 만큼 아이들에게 줄 수 있는 것 같아요. 앞으로 수업할 때 다양한 도구들을 활용하여 아이들에게 더 좋은 교육을 하고 싶습니다!',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '순천중앙초등학교 교사',
    content: '생각보다 더 많은 수업-평가-기록 에듀테크가 있다는 것을 알았습니다. 글쓰기 활동이 참 어렵다고 생각했는데 선생님 연수를 통해 글쓰기 수업을 어떻게 해야할 지 청사진을 그려볼 수 있었습니다. 좋은 연수 감사합니다 ^^',
    rating: 5,
  },
  {
    name: '인○○ 선생님',
    role: '순천중앙초등학교 교사',
    content: '딱 제가 원하는 활동에 도움이 되는 강의였습니다. 선생님 덕분에 제가 하고 싶은 학급 활동을 진행하게 되어 너무 기쁩니다. 이 연수는 엽쌤을 만나기 위한 과정이었나봅니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '순천남초등학교 교사',
    content: '수업시간에 유용하게 사용할 수 있었던 다양한 플랫폼을 알아보고 체험할 수 있는 기회가 되었다. 지금 나의 학급에도 있는 문제학생을 다방면으로 지도하는 방안에 대해 다시 한 번 생각해 보게 되었다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '장흥초등학교 교사',
    content: '선생님의 강의를 들어보니 조금만 관심을 갖고 찾아보면 나도 나만의 수업브랜드를 만들고 학생성장이라는 이상을 구체적인 현실로 만들 수 있을 것 같다는 용기와 확신이 생겼습니다. 다양한 에듀테크뿐 아니라 이를 활용할 수 있는 실제 사례를 보여주셔서 감사합니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '영광초등학교 교사',
    content: '여러가지 에듀테크와 함께 책을 출간할 수 있는 프로그램을 알게 되어 좋았습니다. 학교에서 학생들과 함께 활용해보면 좋겠다는 생각을 하였습니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '여수봉산초등학교 교사',
    content: '여러 아픔이 있는 친구들과 함께 멋있는 책을 만든 것이 참 인상깊었습니다. 다양한 에듀테크를 활용하면 글쓰기를 싫어하는, 또 집중력이 부족한 학생들의 특성에 맞게 좋은 수업을 구성할 수 있을 것 같다는 자신감도 알게 되었습니다. 감사합니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포서해초등학교 교사',
    content: '김희엽 선생님께서 다년간 진행해오신 독서인문교육에서 많은 영감을 받았습니다. 독서인문교육에서 뿐만 아니라 나의 수업과 학교 업무 전반에서 활용하기 유용한 에듀테크를 알게 되어 든든한 마음입니다.',
    rating: 5,
  },
  {
    name: '윤○○ 선생님',
    role: '목포에항초등학교 교사',
    content: '매년 꾸준히 쌓아오신 선생님의 교육 경험을 나눠주셔서 감사했습니다. 선생님님 반 학생들이 400자에서 이후 몇 천 자를 쓰는 것을 보면서 교사의 일관된 지도로 아이들이 성장할 수 있음을 느꼈습니다. 오늘 알려주신 자작자작 플랫폼을 활용해서 아이들의 꾸준한 성장을 이뤄주는 쓰기 지도를 도전해보고 싶습니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '해제초등학교 교사',
    content: 'AI 기반 글쓰기 도구인 크리드와 자작자작의 다양한 활용 방법을 배울 수 있어 매우 유익했습니다. 앞으로 실제 수업에서 다양한 AI 교구들을 적극 활용하여 학생들의 글쓰기 역량을 키우고 싶습니다.',
    rating: 5,
  },
  {
    name: '정○○ 선생님',
    role: '목포상동초등학교 교사',
    content: '독서교육과 학생 정서 교육까지 함께 할 수 있는 프로그램을 많이 알게 되어 학교에서 도서 업무를 진행할 때 매우 큰 도움이 될 것 같습니다. 한 학생을 위해 프로그램을 진행하셨던 사례, 학생들의 변화까지 이끌어 내신 사례를 보니 \'글\'이 주는 힘이 크다는 것을 느꼈습니다.',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '여수남산초등학교 교사',
    content: '글쓰기와 관련한 에듀테크를 다양하게 알 수 있어서 좋았습니다. 특히 자작자작을 통해 아이들이 어떻게 변화했는지 보면서 활용방안에 대해 더욱 고민하게 되었습니다. VIP라고 불리는 아이들을 포기하지 않고 계속 관심과 노력을 쓰는 모습이 정말 멋있다고 생각했습니다.',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '고흥동초등학교 교사',
    content: '다양한 에듀테크 알려주셔서 다음 학기에 꼭 써보고 싶습니다. 저도 책 출판에 관심이 있는데 학생들 책뿐만 아니라 교사 책출판도 더 알아보고 싶습니다!',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '봉래초등학교 교사',
    content: '저도 독서인문교육에 관심이 있고 책 만들기, 출판에 관심이 많았는데 정말 많은 도움이 되었습니다. 올해 독서동아리 만들어서 학생들과 책만들기를 한번 해보려고 합니다. 정말 도움이 많이 된 강의였습니다. 책도 잘 읽겠습니다~',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '남악초등학교 교사',
    content: '디지털 기기 활용과 여러 에듀테크 활용 역량이 부족하다고 느꼈는데, 이번 연수를 통해서 여러 플랫폼과 에듀테크 기술을 배울 수 있어서 유익했습니다. 특히 부크크를 통한 출판은 나중에 꼭 활용해보고 싶습니다.',
    rating: 5,
  },
  {
    name: '박○○ 선생님',
    role: '순천남초등학교 교사',
    content: '학급특색교육으로 학급 문집을 만들고자 생각하고 있었는데 주제를 정하지 못했다. 오늘 강의를 통해 글을 써보는 것으로 결정했다. 다양한 에듀테크 기술을 활용하여 진입장벽이 낮아진 것 같다. 감사합니다 ^^!!',
    rating: 5,
  },
  {
    name: '나○○ 선생님',
    role: '완도중앙초등학교 교사',
    content: '연수생에게 주시는 정보만으로도 선물인데 선물까지 준비해주셔서 너무 풍부한 연수였습니다!! 글쓰기와 책출판에 대한 선생님의 관심을 엿볼 수 있어 좋았던 시간이었어요. 저도 집념갖고 글쓰기지도 열심히해보겠습니다...ㅎ 많이 알려주셔서 감사합니다!!',
    rating: 5,
  },
  {
    name: '고○○ 선생님',
    role: '목포서부초등학교 교사',
    content: '에듀테크 활용 방안에 대해 고민해보는 기회가 되어 좋았다. 독서인문교육 그리고 글쓰기 수업에 대해 생각해보지 못했는데 글쓰기의 효과에 대해 깨달을 수 있었다.',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '창촌초등학교 교사',
    content: '여러 가지 에듀테크를 사용하고 배워볼 수 있는 기회가 되어서 정말 좋았습니다! 특히 자작자작과 부크크는 학생들 글쓰기 교육에 활용하기 좋을 것 같습니다! 많은 것들을 배울 수 있는 유익한 시간이었습니다. 감사합니다~',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '여수쌍봉초등학교 교사',
    content: '수업에서 활용할 수 있는 다양한 에듀테크 플랫폼을 알게 되어 너무 유익한 수업이었습니다. 이번 기회를 통해 다양한 플랫폼들을 활용하여 수업을 해보고 싶습니다. 감사합니다!',
    rating: 5,
  },
  {
    name: '나○○ 선생님',
    role: '목포신흥초등학교 교사',
    content: '독서 교육의 다양한 방법과 에듀테크 도구의 유용함을 알게 되었습니다. 북크크로 제 개인책이든 학급 책이든 꼭 책을 출판해보려고 합니다. 감사합니다ㅎㅎ',
    rating: 5,
  },
  {
    name: '박○○ 선생님',
    role: '광양동초등학교 교사',
    content: '엽쌤의 빛나는 아이디어 스펀지처럼 빨아들이기! 오늘 강의를 통해 독서인문교육, 에듀테크 활용에 대해서 많은 것을 배웠습니다. 실제 교육현장에 적용하고 싶어 드릉드릉 중입니다..✨ 다양한 아이디어 던져주셔서 감사합니다❤️',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '나주금천초등학교 교사',
    content: '강의 주제가 딱딱해서 지루한 강의일줄 알았습니다. 에듀테크를 활용하여 수업-평가를 진행하니 효과, 효율적으로 할 수 있을 것 같습니다. 감사합니다.',
    rating: 5,
  },
  {
    name: '방○○ 선생님',
    role: '여수송현초등학교 교사',
    content: '독서교육과 AI는 융합하기 어려울 것이라 생각했는데, 글쓰기, 고쳐쓰기, 출판 등 다양한 방면에서 AI를 활용할 수 있다는 것을 알게 되었다. 독서교육 하나만으로 인성교육, 글쓰기 교육, 비판적 사고 교육, 협력교육을 모두 할 수 있다니 교사로서 정말 존경스럽습니다!! 가까운 학교에서 늘 응원하겠습니다!',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '고흥동초등학교 교사',
    content: '평소 학생들의 문해력을 관찰하거나 국어 수업을 할때 국어실태에 놀란 뒤 독서 인문교육에 대해 관심을 가지게 되었는데 선생님께서 직접 겪거나 진행하신 프로젝트 및 포트폴리오를 보여주셔서 유익한 시간이었습니다.',
    rating: 5,
  },
  {
    name: '신○○ 선생님',
    role: '순천용당초등학교 교사',
    content: '다양한 에듀테크 소개, 그것들을 활용한 구체적인 수업 사례까지 들을 수 있어서 의미있었습니다. 이야기를 재미있게 해주셔서 더 몰입력 있게 들을 수 있었습니다. 수고하셨습니다~',
    rating: 5,
  },
  {
    name: '강○○ 선생님',
    role: '주암초등학교 교사',
    content: '다양한 에듀테크에 대해 알게 되었습니다. 저희 학교에서도 책 만들기 사업을 했었고 올해도 할 예정인데 어떻게 사업을 진행할지 생각해보는 계기가 되었습니다. 유익한 강의 감사드립니다^^',
    rating: 5,
  },
  {
    name: '김○○ 선생님',
    role: '광영초등학교 교사',
    content: '글을 쓰면서 자신을 되돌아보고 성장하는 아이들의 모습이 인상깊었습니다. 저도 고등학교때 나도작가프로젝트 비슷한 프로젝트에 참가한 적이 있었는데 글을 써본다는 게 정말 좋으면서 인상적인 기억으로 남더라고요. 나중에 한번 꼭 도전해보고 싶습니다!',
    rating: 5,
  },
];

interface GuestEntry {
  name: string;
  affiliation: string;
  message: string;
  date: string;
}

// 이름 익명화 함수: "김희엽" → "김○○", "이소연" → "이○○"
function anonymizeName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  const firstChar = trimmed.charAt(0);
  const rest = trimmed.slice(1);
  const masked = rest.replace(/./g, '○');
  return `${firstChar}${masked}`;
}

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestAffiliation, setGuestAffiliation] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ysschool-guestbook');
    if (saved) setGuestEntries(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    const newEntry: GuestEntry = {
      name: guestName.trim(),
      affiliation: guestAffiliation.trim(),
      message: guestMessage.trim(),
      date: new Date().toLocaleDateString('ko-KR'),
    };
    const updated = [newEntry, ...guestEntries];
    setGuestEntries(updated);
    localStorage.setItem('ysschool-guestbook', JSON.stringify(updated));
    setGuestName('');
    setGuestAffiliation('');
    setGuestMessage('');
    setShowForm(false);
  };

  const handleDelete = () => {
    if (deletePassword === '1234') {
      if (deleteIdx !== null) {
        const updated = guestEntries.filter((_, i) => i !== deleteIdx);
        setGuestEntries(updated);
        localStorage.setItem('ysschool-guestbook', JSON.stringify(updated));
      }
      setDeleteIdx(null);
      setDeletePassword('');
      setDeleteError(false);
    } else {
      setDeleteError(true);
    }
  };

  const cancelDelete = () => {
    setDeleteIdx(null);
    setDeletePassword('');
    setDeleteError(false);
  };

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Testimonials & Guestbook</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            방명록 & 후기
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            엽쌤스쿨을 방문해주신 분들의 따뜻한 한마디가 큰 힘이 됩니다.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-6 break-keep">
                &ldquo;{testimonials[currentIdx].content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-brand-navy dark:text-brand-sky" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{testimonials[currentIdx].name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[currentIdx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIdx ? 'bg-brand-navy dark:bg-brand-sky w-8' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Guestbook */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PenLine className="w-5 h-5 text-brand-sky" />
              방명록
            </h4>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm cursor-pointer text-sm"
            >
              <Send className="w-4 h-4" />
              글 남기기
            </button>
          </div>

          {/* Write Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="이름"
                    className="flex-shrink-0 sm:w-36 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                    required
                  />
                  <input
                    type="text"
                    value={guestAffiliation}
                    onChange={e => setGuestAffiliation(e.target.value)}
                    placeholder="소속 (선택)"
                    className="flex-shrink-0 sm:w-44 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                  />
                  <input
                    type="text"
                    value={guestMessage}
                    onChange={e => setGuestMessage(e.target.value)}
                    placeholder="따뜻한 한마디를 남겨주세요 ✨"
                    className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">※ 이름은 개인정보 보호를 위해 자동으로 익명 처리됩니다 (예: 김희엽 → 김○○)</p>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl font-bold transition-colors cursor-pointer text-sm"
                  >
                    등록
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Guest Entries */}
          <div className="space-y-3">
            {guestEntries.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">아직 방명록이 없습니다. 첫 번째 글을 남겨보세요!</p>
              </div>
            ) : (
              guestEntries.slice(0, 5).map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-navy dark:text-brand-sky">
                      {entry.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{anonymizeName(entry.name)}</span>
                      {entry.affiliation && (
                        <span className="text-xs text-brand-navy/60 dark:text-brand-sky/60 bg-brand-navy/5 dark:bg-brand-sky/10 px-2 py-0.5 rounded-full">{entry.affiliation}</span>
                      )}
                      <span className="text-xs text-slate-400">{entry.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 break-keep">{entry.message}</p>
                  </div>
                  <button
                    onClick={() => { setDeleteIdx(idx); setDeletePassword(''); setDeleteError(false); }}
                    className="shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
                onClick={cancelDelete}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                      <Trash2 className="w-6 h-6 text-red-500" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">방명록 삭제</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">삭제하려면 비밀번호를 입력하세요.</p>
                  </div>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={e => { setDeletePassword(e.target.value); setDeleteError(false); }}
                    onKeyDown={e => e.key === 'Enter' && handleDelete()}
                    placeholder="비밀번호"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 outline-none text-sm text-center tracking-widest ${
                      deleteError ? 'border-red-400 focus:border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-brand-sky'
                    } transition-colors`}
                    autoFocus
                  />
                  {deleteError && (
                    <p className="text-xs text-red-500 text-center mt-2">비밀번호가 일치하지 않습니다.</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors cursor-pointer"
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
