import { useEffect, useRef, useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';

import type { ComponentRef } from 'react';

interface MobileNavbarProps {
  onNavBarClose: () => void;
}

export default function MobileNavbar({ onNavBarClose }: MobileNavbarProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const mobileNavRef = useRef<ComponentRef<'div'>>(null);

  useEffect(() => {
    const node = mobileNavRef.current;

    function callBack(event: AnimationEvent) {
      if (event.animationName !== 'exit') return;

      onNavBarClose();
    }

    node?.addEventListener('animationend', callBack);

    return () => {
      node?.removeEventListener('animationend', callBack);
    };
  }, [onNavBarClose]);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <div
      ref={mobileNavRef}
      className="animate-in slide-in-from-right fill-mode-forwards slide-out-to-right fixed inset-0 z-50 overflow-y-auto bg-white p-6"
    >
      {/* Close Button */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            mobileNavRef.current?.classList.replace(
              'animate-in',
              'animate-out',
            );
          }}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Items */}
      <ul className="text-md space-y-2 pt-8 font-semibold text-gray-500">
        {navLinks.map((item, index) => (
          <li key={item.title}>
            {item.sublinks ? (
              <button
                type="button"
                onClick={() => {
                  toggleSection(item.title);
                }}
                className={`flex w-full cursor-pointer items-center justify-between py-2 ${
                  index !== navLinks.length - 1 || openSection === item.title
                    ? 'border-b border-gray-200'
                    : ''
                }`}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    openSection === item.title ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <Link
                href={item.href ?? '#'}
                onClick={onNavBarClose}
                className={`block w-full py-2 ${
                  index !== navLinks.length - 1
                    ? 'border-b border-gray-200'
                    : ''
                }`}
              >
                {item.title}
              </Link>
            )}

            {item.sublinks && openSection === item.title ? (
              <ul className="text-md space-y-2 border-b border-gray-200 pt-2 pl-4 text-gray-500">
                {item.sublinks.map((sub, subIndex) => (
                  <li key={sub.title}>
                    {sub.href ? (
                      <Link
                        href={sub.href}
                        className={`block py-1 ${
                          subIndex !== (item.sublinks?.length ?? 0) - 1
                            ? 'border-b border-gray-200'
                            : ''
                        }`}
                        onClick={onNavBarClose}
                      >
                        {sub.title}
                      </Link>
                    ) : (
                      <span
                        className={`block py-1 ${
                          subIndex !== (item.sublinks?.length ?? 0) - 1
                            ? 'border-b border-gray-200'
                            : ''
                        }`}
                      >
                        {sub.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
