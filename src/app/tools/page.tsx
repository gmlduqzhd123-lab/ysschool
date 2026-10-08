import { redirect } from 'next/navigation';

export const metadata = {
  title: '에듀테크 도구함 | 에듀테크 나눔 서재',
  description: '에듀테크 도구함이 에듀테크 나눔 서재로 통합되었습니다. 잠시 후 이동합니다.',
};

export default function ToolsRedirectPage() {
  redirect('/library#tools');
}
