'use client';

import { useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { Calendar, ChevronDown, Home, Mail, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import MobileNavbar from '~/components/mobile-nav';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Mobile Top Bar */}
      <div className="container mx-auto flex items-center justify-between border-b-2 border-gray-500 px-2 py-6 md:hidden md:px-0 md:py-0">
        {/* Logo on left */}
        <Image
          className="select-none"
          draggable="false"
          src="/anupama-logo.png"
          alt="Anupama Logo"
          width={140}
          height={40}
          priority
        />

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

      {/* Show mobile nav only if open */}
      {isNavBarOpen ? (
        <MobileNavbar
          onNavBarClose={() => {
            setIsNavBarOpen(false);
          }}
        />
      ) : null}

      {/* Desktop Top Bar */}
      <div className="container mx-auto hidden items-center justify-between px-2 py-12 md:flex">
        {/* Left section - Date */}
        <div className="flex items-center gap-3">
          <Calendar className="h-7 w-7" />
          <div className="flex flex-col">
            <span className="font-bold">Saturday</span>
            <span className="text-sm font-extralight">May 10, 2025</span>
          </div>
        </div>

        {/* Center section - Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Image
            className="select-none"
            draggable="false"
            src="/anupama-logo.png"
            alt="Anupama Logo"
            width={200}
            height={48}
            priority
          />
        </div>

        {/* Right section - Subscribe */}
        <div className="flex items-center gap-4">
          <Link href="/subscribe">
            <div className="flex items-center gap-2 border-b border-current pb-0.5">
              <Mail className="h-5 w-5" />
              <span className="font-medium uppercase">Subscribe</span>
            </div>
          </Link>
        </div>
      </div>

      <DesktopNavbar />
    </header>
  );
}

// Desktop Navigation
export function DesktopNavbar() {
  return (
    <div className="hidden border-t border-b-2 border-gray-500 border-t-gray-300 md:block">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center gap-4 text-sm font-semibold">
          {/* Hamburger Menu (for future use) */}
          <button type="button" className="hover:cursor-pointer">
            <Menu className="h-5 w-5" />
          </button>

          {/* Navigation Links */}
          <DesktopNavLinks />
        </nav>
      </div>
    </div>
  );
}

export function DesktopNavLinks() {
  return (
    <>
      <ul className="relative flex h-full items-center pl-6">
        <li className="mr-3 *:h-full hover:cursor-pointer">
          <Link href="/" className="group flex items-center text-red-500">
            <Home className="h-5 w-5" />
          </Link>
        </li>
        {navLinks.map((link) => (
          <li
            key={link.title}
            className="group relative h-full hover:cursor-pointer first:hover:text-red-500"
          >
            <Link
              href={link.sublinks?.[0]?.href ?? '#'}
              className="mx-3 flex h-full items-center transition duration-300 hover:text-red-500"
            >
              {link.title}
              {link.sublinks ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : null}
            </Link>

            {link.sublinks ? (
              <ul className="absolute left-0 z-50 hidden w-40 border-t-2 border-red-500 bg-white py-2 text-sm shadow-lg transition-all delay-300 duration-200 ease-in-out group-hover:block">
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
          </li>
        ))}
      </ul>
    </>
  );
}
