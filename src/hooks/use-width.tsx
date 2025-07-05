'use client';

import { useEffect, useState } from 'react';

/**
 * Custom React hook that returns the current width of the browser window.
 *
 * This hook sets up an event listener for the window's `resize` event and updates
 * the width state whenever the window is resized. The event listener is cleaned up
 * automatically when the component using this hook is unmounted.
 *
 * @returns {number} The current width of the window in pixels.
 *
 * @example
 * const width = useWindowWidth();
 * console.log(`Window width: ${width}px`);
 */
export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
