import type { BlogPost } from '@/data/blogPosts';

export const BLOG_ADMIN_PASSWORD = '1234';

export interface CustomBlogPost extends BlogPost {
  id: string;
  author?: string;
  content: string;
  isCustom?: boolean;
  updatedAt?: string;
}

const STORAGE_KEY_CUSTOM_POSTS = 'ysschool_custom_blog_posts';
const STORAGE_KEY_DELETED_SLUGS = 'ysschool_deleted_blog_slugs';
const STORAGE_KEY_EDITED_POSTS = 'ysschool_edited_blog_posts';

// 비밀번호 검증 헬퍼 (기본 비밀번호: 1234)
export function verifyBlogActionPassword(inputPassword: string): boolean {
  return inputPassword.trim() === BLOG_ADMIN_PASSWORD;
}

// 1. 커스텀 작성 글 목록 가져오기
export function getStoredCustomPosts(): CustomBlogPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_POSTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load custom blog posts', err);
    return [];
  }
}

// 2. 삭제된 slug 목록 가져오기
export function getStoredDeletedSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED_SLUGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// 3. 수정된 기본 글 오버라이드 맵 가져오기
export function getStoredEditedPosts(): Record<string, Partial<CustomBlogPost>> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EDITED_POSTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export type BlogPostInput = {
  id?: string;
  slug?: string;
  title: string;
  date?: string;
  description: string;
  category: string;
  readTime: string;
  author?: string;
  content: string;
};

// 4. 새 글 저장 또는 기존 글 수정
export function saveBlogPost(postData: BlogPostInput): CustomBlogPost {
  const isNew = !postData.id || postData.id.startsWith('new_');
  const now = new Date();
  const dateStr = now.toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' }); // YYYY-MM-DD

  const id = isNew ? `custom-${Date.now()}` : postData.id!;
  const slug = isNew ? id : (postData.slug || id);

  const fullPost: CustomBlogPost = {
    ...postData,
    id,
    slug,
    date: postData.date || dateStr,
    isCustom: true,
    updatedAt: now.toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const currentList = getStoredCustomPosts();
      const existingIndex = currentList.findIndex((p) => p.slug === slug || p.id === id);

      if (existingIndex >= 0) {
        currentList[existingIndex] = fullPost;
      } else {
        // 기존 기본 글을 수정한 경우와 신규 작성 글 구분
        currentList.unshift(fullPost);
      }
      localStorage.setItem(STORAGE_KEY_CUSTOM_POSTS, JSON.stringify(currentList));
    } catch (err) {
      console.error('Failed to save blog post', err);
    }
  }

  return fullPost;
}

// 5. 글 삭제
export function deleteBlogPost(slugOrId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // 1) 커스텀 글에서 제거
    const customList = getStoredCustomPosts();
    const filtered = customList.filter((p) => p.slug !== slugOrId && p.id !== slugOrId);
    localStorage.setItem(STORAGE_KEY_CUSTOM_POSTS, JSON.stringify(filtered));

    // 2) 기본 글 삭제 목록에도 추가 (기본 글 삭제 지원)
    const deletedSlugs = getStoredDeletedSlugs();
    if (!deletedSlugs.includes(slugOrId)) {
      deletedSlugs.push(slugOrId);
      localStorage.setItem(STORAGE_KEY_DELETED_SLUGS, JSON.stringify(deletedSlugs));
    }

    return true;
  } catch (err) {
    console.error('Failed to delete blog post', err);
    return false;
  }
}

// 6. 단일 글 조회 (기본 글 + 커스텀 글 + 수정 오버라이드)
export function getSingleBlogPost(slugOrId: string, defaultPosts: BlogPost[]): CustomBlogPost | null {
  // 삭제 여부 체크
  const deletedSlugs = getStoredDeletedSlugs();
  if (deletedSlugs.includes(slugOrId)) return null;

  // 1) 커스텀 글 목록에서 검색
  const customList = getStoredCustomPosts();
  const customFound = customList.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (customFound) return customFound;

  // 2) 기본 글 목록에서 검색
  const defaultFound = defaultPosts.find((p) => p.slug === slugOrId);
  if (defaultFound) {
    return {
      ...defaultFound,
      id: defaultFound.slug,
      content: defaultFound.description, // 기본 글은 설명으로 폴백
      isCustom: false,
    };
  }

  return null;
}

// 7. 전체 글 목록 병합 (기본 글 + 커스텀 글 - 삭제된 글)
export function mergeAllBlogPosts(defaultPosts: BlogPost[]): CustomBlogPost[] {
  const deletedSlugs = getStoredDeletedSlugs();
  const customPosts = getStoredCustomPosts();

  // 기본 글 중 삭제되지 않은 것들
  const activeDefaultPosts: CustomBlogPost[] = defaultPosts
    .filter((p) => !deletedSlugs.includes(p.slug))
    .map((p) => {
      // 커스텀 목록에 같은 slug가 있다면 덮어쓰기된 상태
      const overridden = customPosts.find((c) => c.slug === p.slug);
      if (overridden) return overridden;
      return {
        ...p,
        id: p.slug,
        content: p.description,
        isCustom: false,
      };
    });

  // 순수 신규 커스텀 글 (기본 글 slug와 겹치지 않는 것)
  const defaultSlugSet = new Set(defaultPosts.map((p) => p.slug));
  const newCustomPosts = customPosts.filter(
    (c) => !defaultSlugSet.has(c.slug) && !deletedSlugs.includes(c.slug)
  );

  // 병합 후 날짜 역순 정렬
  const merged = [...newCustomPosts, ...activeDefaultPosts];
  return merged.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
}
