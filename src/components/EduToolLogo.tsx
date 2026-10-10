'use client';

import React, { useState } from 'react';
import type { EduToolItem } from '@/data/eduToolsData';

interface EduToolLogoProps {
  tool: EduToolItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 20개 에듀테크별 공식 대표 로고 고화질 벡터 SVG 렌더러
 * 외부 파비콘 API의 흐릿한 지구본 문제 및 CORS/403 차단 문제를 100% 해결합니다.
 */
function BrandVectorIcon({ id }: { id: string }) {
  switch (id) {
    case 'jajakjakjak':
      // 자작자작: 블루 그라디언트 + 만년필 펜촉 & 글쓰기 노트 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#jajak-grad)" />
          <path
            d="M14 34L19 32.5L31.5 20L28 16.5L15.5 29L14 34Z"
            fill="#FFFFFF"
          />
          <path
            d="M33 18.5L30.5 16L32.5 14C33.3 13.2 34.7 13.2 35.5 14L36 14.5C36.8 15.3 36.8 16.7 36 17.5L33 18.5Z"
            fill="#93C5FD"
          />
          <circle cx="18" cy="30" r="1.5" fill="#1D4ED8" />
          <path
            d="M13 37H35"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="jajak-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'bookk':
      // 부크크 (Bookk): 청록/민트 그라디언트 + 펼쳐진 종이책 & 정식 출판 ISBN 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#bookk-grad)" />
          <path
            d="M24 18C21 15 14 15.5 12 16V33C14 32.5 21 32 24 35C27 32 34 32.5 36 33V16C34 15.5 27 15 24 18Z"
            fill="#FFFFFF"
          />
          <path
            d="M24 18V35"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 21H20M16 25H20M28 21H32M28 25H32"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="bookk-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'cread':
      // 크리드 (Cread): 스카이블루 + AI 문장 분석 첨삭 체크 펜 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#cread-grad)" />
          <rect x="12" y="13" width="24" height="22" rx="4" fill="#FFFFFF" />
          <path
            d="M17 19H31M17 24H27M17 29H23"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="31" cy="27" r="5" fill="#38BDF8" />
          <path
            d="M29 27L30.5 28.5L33.5 25.5"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cread-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'tooning':
      // 투닝 (Tooning): 선명한 보라/마젠타 + AI 웹툰 캐릭터 말풍선 표정
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#tooning-grad)" />
          <path
            d="M12 22C12 16.5 17.4 12 24 12C30.6 12 36 16.5 36 22C36 27.5 30.6 32 24 32C22.2 32 20.5 31.6 19 30.9L13 33L14.4 28.4C12.9 26.6 12 24.4 12 22Z"
            fill="#FFFFFF"
          />
          <circle cx="20" cy="21" r="2" fill="#7E22CE" />
          <circle cx="28" cy="21" r="2" fill="#7E22CE" />
          <path
            d="M21 25C22 26.5 26 26.5 27 25"
            stroke="#7E22CE"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="tooning-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#7E22CE" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'canva':
      // 캔바 (Canva): 캔바 공식 시안/블루 그라디언트 원형 + 유려한 'C' 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#canva-grad)" />
          <circle cx="24" cy="24" r="14" fill="#00C4CC" />
          <path
            d="M29.5 18C28 16.8 26.2 16 24 16C19.5 16 16 19.5 16 24C16 28.5 19.5 32 24 32C26.5 32 28.2 31.2 29.5 30"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="29" cy="24" r="2.2" fill="#FFFFFF" />
          <defs>
            <linearGradient id="canva-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'chatgpt':
      // ChatGPT: OpenAI 공식 시그니처 틸(#10A37F) + 정교한 나선형 심볼 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#10A37F" />
          <g transform="translate(11, 11) scale(1.08)" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M12 2C8.7 2 6 4.7 6 8V9C4.3 9.5 3 11 3 12.8C3 14.8 4.3 16.4 6.1 16.9C6.2 18.7 7.7 20.2 9.5 20.7C10.2 21.5 11.1 22 12.1 22C15.4 22 18.1 19.3 18.1 16V15C19.8 14.5 21.1 13 21.1 11.2C21.1 9.2 19.8 7.6 18 7.1C17.9 5.3 16.4 3.8 14.6 3.3C13.9 2.5 13 2 12 2Z" />
            <path d="M12 8V16M8.5 10L15.5 14M8.5 14L15.5 10" />
          </g>
        </svg>
      );

    case 'padlet':
      // 패들렛 (Padlet): 패들렛 공식 오렌지(#FF5722) + 종이학/포스트잇 협업 핀 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#FF5722" />
          <path
            d="M13 24C13 18 17.5 13 24 13C30.5 13 35 18 35 24C35 28 32 31.5 28 32.5L28 36L23 33L21 33C16 33 13 29 13 24Z"
            fill="#FFFFFF"
          />
          <path
            d="M20 23C20 21.3 21.3 20 23 20C24.7 20 26 21.3 26 23C26 24.7 24.7 26 23 26C21.3 26 20 24.7 20 23Z"
            fill="#FF5722"
          />
          <circle cx="28.5" cy="21.5" r="1.5" fill="#FF8A65" />
          <circle cx="17.5" cy="24.5" r="1.5" fill="#FF8A65" />
        </svg>
      );

    case 'classcard':
      // 클래스카드: 클래스카드 공식 로즈 레드 + 2장의 어휘 플래시카드 배틀 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#classcard-grad)" />
          <rect x="18" y="11" width="18" height="24" rx="3" fill="#FFE4E6" transform="rotate(8 18 11)" />
          <rect x="13" y="15" width="18" height="24" rx="3" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M17 21H27M17 25H24" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="31" r="2.5" fill="#E11D48" />
          <defs>
            <linearGradient id="classcard-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'tkbell':
      // 띵커벨 (Tkbell): 띵커벨 공식 앰버/노랑 골드 + 퀴즈 알림 벨(Bell) 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#tkbell-grad)" />
          <path
            d="M24 12C20 12 16.5 15 16.5 19V26L14 29H34L31.5 26V19C31.5 15 28 12 24 12Z"
            fill="#FFFFFF"
          />
          <circle cx="24" cy="33.5" r="3" fill="#FFFFFF" />
          <path
            d="M24 9V12"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M20 21L23 24L28 18"
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="tkbell-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'wrtn':
      // 뤼튼 (Wrtn): 뤼튼 공식 로얄 인디고(#4F46E5) + 번개 모양의 'W' 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#wrtn-grad)" />
          <path
            d="M13 16L18 32L24 20L30 32L35 16"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="15" r="2.5" fill="#A5B4FC" />
          <defs>
            <linearGradient id="wrtn-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'kahoot':
      // 카훗 (Kahoot): 카훗 시그니처 딥 퍼플(#46178F) + 굵은 'K!' 느낌표 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#46178F" />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="-1"
          >
            K!
          </text>
        </svg>
      );

    case 'miricanvas':
      // 미리캔버스: 공식 민트 그린(#00D282) + 뫼비우스 루프 'm' 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#00D282" />
          <path
            d="M14 26C14 20 18 16 23 16C28 16 30 20 30 23C30 26 28 30 23 30C19 30 16 27 16 24C16 20 20 17 25 17C30 17 34 21 34 26"
            stroke="#FFFFFF"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'blooket':
      // 블루캣 (Blooket): Blooket 시그니처 오렌지/시안 아케이드 Blook 블록 얼굴
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#blooket-grad)" />
          <rect x="13" y="13" width="22" height="22" rx="5" fill="#FFFFFF" />
          <circle cx="19" cy="22" r="2.5" fill="#0284C7" />
          <circle cx="29" cy="22" r="2.5" fill="#0284C7" />
          <path
            d="M21 28C22.5 30 25.5 30 27 28"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="blooket-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'notion':
      // Notion: 노션 공식 블랙 & 화이트 큐브 'N' 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#000000" />
          <path
            d="M15 14H31C32.1 14 33 14.9 33 16V32C33 33.1 32.1 34 31 34H15C13.9 34 13 33.1 13 32V16C13 14.9 13.9 14 15 14Z"
            fill="#FFFFFF"
          />
          <path
            d="M17 17L22 17.5V30.5L18.5 31V19L27 31H30V17.5L25 17V28.5L17 17Z"
            fill="#000000"
          />
        </svg>
      );

    case 'quizlet':
      // 퀴즐렛 (Quizlet): 퀴즐렛 공식 로얄 블루(#4257B2) + 볼드 'Q' 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#4257B2" />
          <circle cx="23" cy="23" r="10" stroke="#FFFFFF" strokeWidth="4" />
          <path
            d="M28 28L34 34"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="23" cy="23" r="3.5" fill="#38BDF8" />
        </svg>
      );

    case 'gimkit':
      // 지미트 (Gimkit): 지미트 공식 에메랄드(#10B981) + 게임 코인 G 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="url(#gimkit-grad)" />
          <circle cx="24" cy="24" r="13" stroke="#FFFFFF" strokeWidth="3" fill="#059669" />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="18"
          >
            G
          </text>
          <defs>
            <linearGradient id="gimkit-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'entry':
      // 엔트리 (Entry): 네이버 커넥트재단 엔트리 공식 초록(#00B050) + 코딩 블록 퍼즐
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#00B050" />
          <rect x="14" y="14" width="20" height="20" rx="4" fill="#FFFFFF" />
          <path
            d="M21 14C21 12.3 22.3 11 24 11C25.7 11 27 12.3 27 14"
            stroke="#00B050"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M34 21C35.7 21 37 22.3 37 24C37 25.7 35.7 27 34 27"
            stroke="#00B050"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="23" r="2" fill="#00B050" />
          <circle cx="28" cy="23" r="2" fill="#00B050" />
          <path d="M22 27C23 28.5 25 28.5 26 27" stroke="#00B050" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'clovadubbing':
      // 네이버 클로바더빙: 네이버 클로바 공식 그린(#03C75A) + 스피커 음파 심볼
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#03C75A" />
          <path
            d="M21 17L16 21H13C12.4 21 12 21.4 12 22V26C12 26.6 12.4 27 13 27H16L21 31V17Z"
            fill="#FFFFFF"
          />
          <path
            d="M25 19C27 20.5 28 22.2 28 24C28 25.8 27 27.5 25 29M28.5 15C31.5 17.5 33 20.6 33 24C33 27.4 31.5 30.5 28.5 33"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'google-classroom':
      // 구글 클래스룸: 구글 클래스룸 공식 노란 프레임 + 초록 칠판 + 흰색/노랑 교실 분필 인물
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#F9AB00" />
          <rect x="9" y="9" width="30" height="30" rx="4" fill="#0F9D58" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="3.5" fill="#FFFFFF" />
          <path
            d="M17 30C17 26.5 20.5 25 24 25C27.5 25 31 26.5 31 30"
            fill="#FFFFFF"
          />
          <circle cx="17.5" cy="22" r="2.5" fill="#FDD663" />
          <path
            d="M12.5 29C12.5 26.5 15 25.5 17.5 25.5"
            stroke="#FDD663"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="30.5" cy="22" r="2.5" fill="#FDD663" />
          <path
            d="M35.5 29C35.5 26.5 33 25.5 30.5 25.5"
            stroke="#FDD663"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'nearpod':
      // 니어팟 (Nearpod): 니어팟 공식 블루(#007AFF) + 입체 육각형 'N' 로고
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect width="48" height="48" rx="12" fill="#007AFF" />
          <path
            d="M24 13L34 18.5V30L24 35.5L14 30V18.5L24 13Z"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M19 21V28L28 21V28"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

export default function EduToolLogo({
  tool,
  className = '',
  size = 'md',
}: EduToolLogoProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const containerSizes = {
    sm: 'w-10 h-10 rounded-xl p-1',
    md: 'w-12 h-12 sm:w-13 sm:h-13 rounded-2xl p-1',
    lg: 'w-14 h-14 rounded-2xl p-1.5',
  };

  const imgSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
    lg: 'w-12 h-12 rounded-xl',
  };

  // 공식 이미지 URL이 명시되어 있고 아직 에러가 발생하지 않은 경우
  // 단, 회색 지구본을 뱉는 일반 구글 파비콘 API는 제외하고 자체 고화질 벡터 마크 또는 실제 검증된 이미지 URL을 우선 사용합니다.
  const hasDedicatedLogo = Boolean(
    tool.logoUrl &&
      !tool.logoUrl.includes('google.com/s2/favicons') &&
      !imgError,
  );

  return (
    <div
      className={`relative flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all duration-200 shrink-0 overflow-hidden group-hover:scale-105 ${containerSizes[size]} ${className}`}
      title={`${tool.name} 공식 로고`}
    >
      {hasDedicatedLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.logoUrl}
          alt={`${tool.name} 대표 로고`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`${imgSizes[size]} object-contain drop-shadow-2xs transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      ) : (
        // 전용 고화질 공식 브랜드 벡터 마크 (절대 회색 지구본이 뜨지 않는 100% 보장 렌더링)
        <div className="w-full h-full p-0.5 flex items-center justify-center">
          <BrandVectorIcon id={tool.id} />
        </div>
      )}
    </div>
  );
}
