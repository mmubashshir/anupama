'use client';

import { useState } from 'react';
import { navLinks, subLinks } from '~/constants/nav-links';
import { useScrollPosition } from '~/hooks/use-scroll-position';
import { ChevronDown, FacebookIcon, Menu, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '~/components/container';
import MobileNavbar from '~/components/mobile-nav';

export default function Header() {
  const scrollPosition = useScrollPosition();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const isQuickLinksHidden = scrollPosition > 120;

  return (
    <div className="bg-primary">
      <Container as="header" className="px-8">
        {/* Mobile Top Bar - Made Sticky */}
        <div className="bg-primary fixed top-0 right-0 left-0 z-40 flex w-full flex-col items-center shadow-xs md:hidden">
          {/* Logo */}

          <Link className="flex flex-col place-items-center" href="/">
            <Image
              className="mx-auto ml-2 h-[60px] w-auto select-none"
              draggable="false"
              src="/anupama-logo.svg"
              alt="Anupama Logo"
              width={120}
              height={40}
              priority
            />
            <span className="-mt-2 ml-4 block text-center text-sm font-bold text-white text-shadow-2xs">
              ಸುಂಧರ ನಾಳೆಗೆ, ಸುಮಧುರ ಬಾಳಿಗೆ{' '}
            </span>
          </Link>

          <div className="flex w-full items-center justify-between gap-2">
            {/* Scrollable Links */}
            <div className="scroll-container flex w-full snap-x snap-mandatory snap-always flex-row items-center gap-4 overflow-x-scroll py-2">
              {subLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="my-auto snap-start bg-yellow-400 p-2 text-sm font-semibold whitespace-nowrap text-black"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Right Side Menu */}
            <div className="flex flex-shrink-0 items-center gap-4 pr-4">
              <div className="mb-1 h-6 w-0.5 bg-white"></div>
              <button
                type="button"
                className="size-10 cursor-pointer self-start bg-white"
                onClick={() => setIsNavBarOpen(true)}
              >
                <Menu className="text-primary m-auto size-10 stroke-[0.6]" />
              </button>
            </div>
          </div>
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
        <div className="container mx-auto hidden items-center justify-between px-2 py-12 text-white md:flex">
          {/* Left section - Date */}

          <div className="text-primary bg-white px-4 py-4 text-3xl font-extrabold">
            ಚಂದಾದಾರರಾಗಿ
          </div>

          {/* Center section - Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 transform"
          >
            <Image
              className="h-[100px] w-auto select-none"
              draggable="false"
              src="/anupama-logo.svg"
              alt="Anupama Logo"
              width={200}
              height={180}
              priority
            />

            <span className="mt-2 block text-center text-lg font-extrabold text-white text-shadow-2xs">
              ಸುಂಧರ ನಾಳೆಗೆ, ಸುಮಧುರ ಬಾಳಿಗೆ{' '}
            </span>
          </Link>

          {/* Right section - Subscribe */}
          <div className="flex flex-row gap-4">
            <Link
              href="https://www.youtube.com/@anupamamasika9395"
              target="_blank"
              className="bg-white p-2 hover:scale-110"
            >
              <Youtube className="text-primary h-8 w-8" />
            </Link>

            <Link
              href="https://www.facebook.com/anupama.masika"
              className="bg-white p-2 hover:scale-110"
              target="_blank"
            >
              <FacebookIcon className="text-primary h-8 w-8" />
            </Link>
          </div>
        </div>
        <DesktopNavbar />
      </Container>
    </div>
  );
}
export function DesktopNavbar() {
  return (
    <div className="hidden border-t-4 border-t-white text-white md:block">
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
            className="group relative h-full hover:cursor-pointer hover:bg-white"
          >
            {link.sublinks ? (
              <span className="group-hover:text-primary mx-3 flex h-full items-center transition-all duration-75">
                {link.title}
                <ChevronDown className="group-hover:text-primary m-1 h-4 w-4 text-white transition-all duration-500 group-hover:rotate-180" />
              </span>
            ) : (
              <Link
                href={link.href ?? '/'}
                className="group-hover:text-primary mx-3 flex h-full items-center transition-all duration-75"
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
                      className={`hover:text-primary block px-4 py-2 text-gray-700 ${
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
