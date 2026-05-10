import { Mail, Code2, Tv, BookOpen } from 'lucide-react';

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

          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-brand-sky transition-colors">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <Code2 className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-red-500 transition-colors">
              <span className="sr-only">YouTube</span>
              <Tv className="h-6 w-6" />
            </a>
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
