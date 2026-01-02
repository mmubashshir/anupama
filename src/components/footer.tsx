import { navLinks } from '~/constants/nav-links';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from './container';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <Container className="bg-gray-100 p-4 sm:px-6 lg:px-8 lg:py-10">
        <Container>
          <div className="mb-12 flex flex-col gap-12 pt-2 lg:flex-row lg:items-start">
            {/* Left: Company Info */}
            <div className="lg:w-1/3">
              <Link href="/#" className="mb-6 inline-block" scroll>
                <div className="flex items-center">
                  <Image
                    className="mix-blend-multiply select-none"
                    draggable="false"
                    src="/anupama-logo.png"
                    alt="Anupama Logo"
                    width={170}
                    height={40}
                    priority
                  />
                </div>
                <span className="text-xs tracking-wider text-slate-500 uppercase">
                  {`WOMENS' MONTHLY MAGAZINE`}
                </span>
              </Link>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-medium">Operated by:</span> Sanmarga
                  Publication Trust
                </p>

                <p>
                  <span className="font-medium">Address:</span> 1st floor,
                  Hidayath Centre Bibi Alabi Road, Bunder, Mangalore 575 001
                </p>

                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href="mailto:anupamamasika@gmail.com"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    anupamamasika@gmail.com
                  </a>
                </p>

                <p>
                  <span className="font-medium">Phone:</span>{' '}
                  <a
                    href="tel:+919535445101"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    +91 9535445101
                  </a>{' '}
                  |{' '}
                  <a
                    href="tel:+918197355848"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    8197355848
                  </a>
                </p>

                <p className="pt-2">
                  <span className="font-medium">License No.:</span> RNI No.
                  KARKAN{' '}
                  <span className="pointer-events-none select-none">
                    2010/31373
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Navigation Categories */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-4">
              {navLinks.map((category) => (
                <div key={category.title}>
                  {category.href ? (
                    <Link
                      href={category.href}
                      className="mb-4 inline-block text-lg font-bold hover:text-slate-900"
                    >
                      {category.title}
                    </Link>
                  ) : (
                    <h3 className="mb-4 text-lg font-bold">{category.title}</h3>
                  )}

                  {Array.isArray(category.sublinks) &&
                    category.sublinks.length > 0 && (
                      <ul className="space-y-2">
                        {category.sublinks.map((sublink) => (
                          <li key={sublink.href ?? sublink.title}>
                            <Link
                              href={sublink.href ?? '#'}
                              className="text-slate-600 hover:underline"
                            >
                              {sublink.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="relative border-t border-slate-300 pt-6 text-sm text-gray-700">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              {/* Left Side */}
              <p className="text-center sm:text-left">
                © {new Date().getFullYear()} Copyrights by{' '}
                <Link
                  href="/"
                  className="text-gray-500 underline hover:text-red-500"
                >
                  Anupama.
                </Link>{' '}
                All Rights Reserved.
              </p>

              {/* Right Side */}
              <p className="flex items-center gap-2">
                Designed & Developed by{' '}
                <a
                  href="https://craftyaam.com"
                  target="_blank"
                  rel="noopener"
                  className="transition hover:opacity-80"
                >
                  <Image
                    src="/Logo-CraftyAam.svg"
                    alt="CraftyAam"
                    width={100}
                    height={24}
                    className="h-6 w-auto select-none"
                    draggable="false"
                  />
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Container>
    </footer>
  );
}
