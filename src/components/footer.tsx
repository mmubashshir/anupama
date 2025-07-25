import { navLinks } from '~/constants/nav-links';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from './container';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <Container className="bg-gray-100 p-4 sm:px-6 lg:px-8 lg:py-10">
        {/* Newsletter Section */}
        {/* <div className="mx-auto mb-16 max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-slate-900">
              Get the best blog stories into your inbox
            </h2>
          </div>
          <div className="w-full max-w-md">
            <div className="bg-white">
              <form className="flex gap-2 sm:flex-row">
                <div className="relative flex-grow">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-2 pt-3 pr-3 pl-10 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="text-md px-4 py-2 font-bold text-red-500"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <p className="mt-2 text-xs text-slate-600 italic">
              By subscribing, you accepted our{' '}
              <Link href="/policy" className="underline">
                Policy
              </Link>
            </p>
          </div>
        </div>
      </div> */}

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

                {/* <p>
    <span className="font-medium">Tax Code:</span>{' '}
    0514234567
  </p> */}

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
          <div className="relative border-t border-slate-300 pt-6 text-center text-sm text-gray-700">
            <p>
              © 2025 Copyrights by{' '}
              <Link
                href="/"
                className="text-gray-500 underline hover:text-red-500"
              >
                Anupama.
              </Link>{' '}
              All Rights Reserved. Developed by Mubashir and Co.
            </p>
          </div>
        </Container>
      </Container>
    </footer>
  );
}
