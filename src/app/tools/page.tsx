import Header from '@/components/Header';
import EduToolsCloud from '@/components/EduToolsCloud';
import Footer from '@/components/Footer';

export const metadata = {
  title: '에듀테크 도구 모음 | 엽쌤스쿨',
  description: '엽쌤이 수업에서 활용하는 14가지 에듀테크 도구들을 카테고리별로 확인하세요.',
};

export default function ToolsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <EduToolsCloud />
      </main>
      <Footer />
    </div>
  );
}
