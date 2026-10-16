'use client';

import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
  title: string;
  href: string;
  category?: string;
  visitedAt: number;
}

const HISTORY_KEY = 'ysschool-history';
const FAVORITES_KEY = 'ysschool-favorites';
const MAX_HISTORY = 20;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded – silently ignore */ }
}

/* ───────── 최근 본 콘텐츠 ───────── */
export function useRecentHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => setItems(safeGet<HistoryItem[]>(HISTORY_KEY, [])));
  }, []);

  const addItem = useCallback((item: Omit<HistoryItem, 'visitedAt'>) => {
    setItems((prev) => {
      const filtered = prev.filter((p) => p.href !== item.href);
      const next = [{ ...item, visitedAt: Date.now() }, ...filtered].slice(0, MAX_HISTORY);
      safeSet(HISTORY_KEY, next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setItems([]);
    safeSet(HISTORY_KEY, []);
  }, []);

  return { items, addItem, clearHistory };
}

/* ───────── 즐겨찾기 ───────── */
export function useFavorites() {
  const [favorites, setFavorites] = useState<HistoryItem[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => setFavorites(safeGet<HistoryItem[]>(FAVORITES_KEY, [])));
  }, []);

  const toggleFavorite = useCallback((item: Omit<HistoryItem, 'visitedAt'>) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.href === item.href);
      const next = exists
        ? prev.filter((f) => f.href !== item.href)
        : [{ ...item, visitedAt: Date.now() }, ...prev];
      safeSet(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (href: string) => favorites.some((f) => f.href === href),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
}
