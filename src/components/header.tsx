'use client';

import { useState } from 'react';
import { navLinks } from '~/constants/nav-links';
import { Calendar, ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '~/components/container';
import MobileNavbar from '~/components/mobile-nav';

export default function Header() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <Container as="header" className="px-8">
      {/* Mobile Top Bar - Made Sticky */}
      <div className="fixed top-0 right-0 left-0 z-40 container mx-auto flex h-16 items-center justify-between bg-white p-4 px-4 shadow-xs md:hidden">
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
      {/* Spacer for fixed header on mobile */}
      <div className="h-16 md:hidden" />
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
            <span className="font-bold">
              {new Date().toLocaleDateString('kn-IN', { weekday: 'long' })}
            </span>
            <span className="text-sm font-extralight">
              {new Date().toLocaleDateString('kn-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Center section - Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 transform">
          <Image
            className="select-none"
            draggable="false"
            src="/anupama-logo.png"
            alt="Anupama Logo"
            width={200}
            height={48}
            priority
          />
        </Link>

        {/* Right section - Subscribe */}
        {/* <div className="flex items-center gap-4">
          <Link href="/subscribe">
            <div className="flex items-center gap-2 border-b border-current pb-0.5">
              <Mail className="h-5 w-5" />
              <span className="font-medium uppercase">Subscribe</span>
            </div>
          </Link>
        </div> */}
      </div>
      <DesktopNavbar />
    </Container>
  );
}
export function DesktopNavbar() {
  return (
    <div className="hidden border-t border-b-2 border-gray-500 border-t-gray-300 md:block">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center gap-4 text-sm font-semibold">
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
      <ul className="relative flex h-full items-center">
        {/* <li className="mr-3 *:h-full hover:cursor-pointer">
          <Link href="/" className="group flex items-center text-red-500">
            <Home className="h-5 w-5" />
          </Link>
        </li> */}
        {navLinks.map((link) => (
          <li
            key={link.title}
            className="group relative h-full hover:cursor-pointer"
          >
            {link.sublinks ? (
              <span className="mx-3 flex h-full items-center transition duration-300 hover:text-red-500">
                {link.title}
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </span>
            ) : (
              <Link
                href={link.href ?? '/'}
                className="mx-3 flex h-full items-center transition duration-300 hover:text-red-500"
              >
                {link.title}
              </Link>
            )}

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
