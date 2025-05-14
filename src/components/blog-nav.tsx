'use client';

import { useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { ChevronDown, Home, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import MobileNavbar from './mobile-nav';

export default function DesktopBlogNav() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Mobile Top Bar */}
      <div className="container mx-auto flex items-center justify-between border-b px-4 py-5 md:hidden">
        {/* Logo */}
        <Link href="/">
          <Image
            draggable="false"
            src="/anupama-logo.png"
            alt="Anupama Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Hamburger Menu */}
        <button
          type="button"
          onClick={() => {
            setIsNavBarOpen(true);
          }}
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Navbar */}
      {isNavBarOpen ? (
        <MobileNavbar
          onNavBarClose={() => {
            setIsNavBarOpen(false);
          }}
        />
      ) : null}

      {/* Desktop Top Bar */}
      <div className="hidden md:block">
        <div className="container mx-auto flex items-center justify-between px-15 py-5">
          {/* Logo */}
          <Link href="/">
            <Image
              draggable="false"
              src="/anupama-logo.png"
              alt="Anupama Logo"
              width={140}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link
              href="/"
              className="flex items-center text-red-500 hover:opacity-80"
            >
              <Home className="h-5 w-5" />
            </Link>

            {navLinks.map((link) => (
              <div key={link.title} className="group relative pt-1">
                <Link
                  href={link.sublinks?.[0]?.href ?? '#'}
                  className="flex items-center gap-1 transition hover:text-red-500"
                >
                  {link.title}
                  {Array.isArray(link.sublinks) && link.sublinks.length > 0 && (
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  )}
                </Link>

                {link.sublinks ? (
                  <ul className="absolute left-0 z-50 hidden w-40 border-t-2 border-red-500 bg-white py-2 text-sm shadow-lg transition-all delay-100 duration-200 group-hover:block">
                    {link.sublinks.map((sublink, index) => (
                      <li key={sublink.href}>
                        <Link
                          href={sublink.href ?? '/'}
                          className={`block px-4 py-2 hover:text-red-500 ${
                            index === 0 ? 'font-semibold' : 'text-current'
                          }`}
                        >
                          {sublink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
