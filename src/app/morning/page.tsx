import ClassroomMorningDesk from '@/components/ClassroomMorningDesk';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아침 맞이 교실 데스크 (전자칠판 전용) | 엽쌤스쿨',
  description:
    '초등 교실 전자칠판 전용 무설치·무광고 아침 데스크. 실시간 대형 시계, 아침 자습·독서 타이머, 칠판 알림판, Web Audio 힐링 BGM, 학생 번호 추첨기를 무료로 이용하세요.',
};

export default function MorningDeskPage() {
  return <ClassroomMorningDesk />;
}
