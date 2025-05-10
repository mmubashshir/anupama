import { Calendar, Mail, Menu } from 'lucide-react';
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
      <div className="border-t border-b border-black border-t-gray-300 py-2">
        <div className="container mx-auto py-4">
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <button>
              <Menu className="h-5 w-5" />
            </button>

            <ul className="flex items-center gap-10 pl-10">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-1 text-red-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news">ಸುದ್ದಿ</Link>
              </li>
              <li>
                <Link href="/health">ಆರೋಗ್ಯ</Link>
              </li>
              <li>
                <Link href="/lifestyle">ಜೀವನಶೈಲಿ</Link>
              </li>
              <li>
                <Link href="/stories">ಕಥೆಗಳು</Link>
              </li>
              <li>
                <Link href="/contact">ಸಂಪರ್ಕಿಸಿ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
