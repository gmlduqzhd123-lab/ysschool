'use client';

import { useEffect } from 'react';

export default function ScrollToTopOnMount() {
  useEffect(() => {
    // 1. Force scroll to top on initial load
    window.scrollTo(0, 0);
    
    // 2. Prevent browser from restoring previous scroll position on reload/revisit
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
