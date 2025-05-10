import { navLinks } from '~/constants/nav-links';
import { Calendar, ChevronDown, Home, Mail, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-40">
      {/* Top bar */}
      <div className="container mx-auto flex items-center justify-between px-2 py-12">
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
            src="/anupama-logo.png"
            alt="Anupama Logo"
            width={200}
            height={48}
          />
        </div>

        {/* Right section - Subscribe */}
        <div className="flex items-center gap-4">
          <Link href="/subscribe" className="hidden sm:flex">
            <div className="flex items-center gap-2 border-b border-current pb-0.5">
              <Mail className="h-5 w-5" />
              <span className="font-medium uppercase">Subscribe</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t border-b-2 border-gray-500 border-t-gray-300 py-2">
        <div className="container mx-auto py-4">
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <button>
              <Menu className="h-5 w-5" />
            </button>

            <ul className="flex items-center gap-8 pl-10">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-1 text-red-500"
                >
                  <Home className="h-5 w-5" />
                </Link>
              </li>

              {navLinks.map((link) => (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 transition duration-300 hover:text-red-500"
                  >
                    {link.title}
                    {link.sublinks && (
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    )}
                  </Link>

                  {link.sublinks && (
                    <ul className="absolute left-0 z-50 mt-6 hidden w-40 border-t-2 border-red-500 bg-white py-2 pt-4 text-sm shadow-lg transition-all delay-100 duration-200 group-hover:block">
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
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
