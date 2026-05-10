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
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
