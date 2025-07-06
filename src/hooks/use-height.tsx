'use client';

import { useEffect, useState } from 'react';

/**
 * Custom React hook that returns the current height of the browser window.
 *
 * @returns {number} The current height of the window in pixels.
 *
 * @example
 * const height = useWindowHeight();
 * console.log(`Window height: ${height}px`);
 */
export function useWindowHeight() {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return height;
}
