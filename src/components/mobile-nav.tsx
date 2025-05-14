import { useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';

// Mobile Navigation
export default function MobileNavbar({
  onNavBarClose,
}: {
  onNavBarClose: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>('HOME');

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-6">
      {/* Close Button */}
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={onNavBarClose}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Items */}
      <ul className="text-md space-y-2 pt-8 font-semibold text-gray-500">
        {navLinks.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => {
                toggleSection(item.title);
              }}
              className="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 py-2"
            >
              <span>{item.title}</span>
              {item.sublinks ? (
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    openSection === item.title ? 'rotate-180' : ''
                  }`}
                />
              ) : null}
            </button>

            {item.sublinks && openSection === item.title ? (
              <ul className="text-md space-y-2 border-b border-gray-200 pt-2 pl-4 text-gray-500">
                {item.sublinks.map((sub) => (
                  <li key={sub.title}>
                    {sub.href ? (
                      <Link
                        href={sub.href}
                        className="block border-b border-gray-200 py-1"
                        onClick={onNavBarClose}
                      >
                        {sub.title}
                      </Link>
                    ) : (
                      <span className="block border-b border-gray-200 py-1">
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
