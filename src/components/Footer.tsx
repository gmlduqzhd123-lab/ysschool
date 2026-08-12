import { Mail, BookOpen } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="bg-brand-sky/20 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-brand-sky" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              YSSCHOOL
            </span>
          </div>

          {/* SNS Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@yeopssam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-all duration-300 group"
              title="YouTube - 엽쌤스쿨"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
            </a>
            <a
              href="https://youtube.com/@acappellaakaraka"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white transition-all duration-300"
              title="YouTube - 아카라카"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
            </a>
            <a
              href="https://indischool.com/@user359088"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-green-600 text-slate-400 hover:text-white transition-all duration-300 font-bold text-xs"
              title="인디스쿨"
            >
              <BookOpen className="w-5 h-5" />
            </a>
            <a
              href="mailto:gmlduqzhd@naver.com"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-sky text-slate-400 hover:text-white transition-all duration-300"
              title="이메일"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end text-sm mt-6 md:mt-0">
            <p className="font-semibold text-white mb-2">😀 연수, 컨설팅, 공연 의뢰 😀</p>
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-brand-sky" />
              <a href="mailto:gmlduqzhd@naver.com" className="hover:text-white transition-colors">gmlduqzhd@naver.com</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded">TALK</div>
              <span>yeop24</span>
            </div>
          </div>

        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            &copy; {currentYear} ysschool by 엽쌤. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Powered by Next.js & Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
