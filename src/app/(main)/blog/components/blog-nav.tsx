'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { DesktopNavLinks } from '~/components/header';
import MobileNavbar from '~/components/mobile-nav';

export default function DesktopBlogNav() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 h-16 w-full bg-white">
      {/* Mobile Top Bar */}
      <div className="container mx-auto flex h-full items-center justify-between px-4 shadow-xs md:hidden">
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
          <Menu className="size-7" />
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
      <div className="my-auto hidden h-full items-center border-gray-300 shadow-xs md:flex">
        <div className="container mx-auto flex h-full items-center justify-between">
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
          <nav className="flex h-full items-center text-sm font-semibold">
            <DesktopNavLinks />
          </nav>
        </div>
      </div>
    </header>
  );
}
