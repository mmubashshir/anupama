'use client';

import { useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { Calendar, ChevronDown, Home, Mail, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
        <button type="button" onClick={() => setIsNavBarOpen(true)}>
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Show mobile nav only if open */}
      {isNavBarOpen && (
        <MobileNavbar onNavBarClose={() => setIsNavBarOpen(false)} />
      )}

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

// Mobile Navigation
function MobileNavbar({ onNavBarClose }: { onNavBarClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>('HOME');

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-6">
      {/* Close Button */}
      <div className="mb-4 flex justify-end">
        <button onClick={onNavBarClose}>
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Items */}
      <ul className="text-md space-y-2 pt-8 font-semibold text-gray-500">
        {navLinks.map((item) => (
          <li key={item.title}>
            <div
              onClick={() => toggleSection(item.title)}
              className="flex cursor-pointer items-center justify-between border-b border-gray-200 py-2"
            >
              <span>{item.title}</span>
              {item.sublinks ? (
                <ChevronDown
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    openSection === item.title ? 'rotate-180' : ''
                  }`}
                />
              ) : null}
            </div>

            {item.sublinks && openSection === item.title && (
              <ul className="text-md space-y-2 border-b border-gray-200 pt-2 pl-4 text-gray-500">
                {item.sublinks.map((sub) => (
                  <li key={sub.title}>
                    <Link
                      href={sub.href}
                      className="block border-b border-gray-200 py-1"
                      onClick={onNavBarClose}
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop Navigation
export function DesktopNavbar() {
  return (
    <div className="hidden border-t border-b-2 border-gray-500 border-t-gray-300 md:block">
      <div className="container mx-auto">
        <nav className="flex items-center gap-4 text-sm font-semibold">
          {/* Hamburger Menu (for future use) */}
          <button type="button" className="hover:cursor-pointer">
            <Menu className="h-5 w-5" />
          </button>

          {/* Navigation Links */}
          <ul className="relative flex items-center pl-6">
            <li className="mr-3 *:my-4 hover:cursor-pointer">
              <Link href="/" className="group flex items-center text-red-500">
                <Home className="h-5 w-5" />
              </Link>
            </li>
            {navLinks.map((link) => (
              <li
                key={link.title}
                className="group relative hover:cursor-pointer first:hover:text-red-500"
              >
                <Link
                  href={link.sublinks?.[0]?.href ?? '#'}
                  className="mx-3 my-4 flex items-center transition duration-300 hover:text-red-500"
                >
                  {link.title}
                  {link.sublinks ? (
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  ) : null}
                </Link>

                {link.sublinks ? (
                  <ul className="absolute left-0 z-50 hidden w-40 border-t-2 border-red-500 bg-white py-2 text-sm shadow-lg transition-all delay-100 duration-200 group-hover:block">
                    {link.sublinks.map((sublink, index) => (
                      <li key={sublink.href}>
                        <Link
                          href={sublink.href}
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
        </nav>
      </div>
    </div>
  );
}
