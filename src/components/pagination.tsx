'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const createPageLinks = () => {
    const pages = [];
    const maxDisplayed = 3;

    pages.push(
      <PageLink
        key={1}
        page={1}
        isActive={currentPage === 1}
        basePath={basePath}
      />,
    );

    if (currentPage > maxDisplayed) {
      pages.push(<Ellipsis key="ellipsis-1" />);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <PageLink
          key={i}
          page={i}
          isActive={currentPage === i}
          basePath={basePath}
        />,
      );
    }

    if (currentPage + 2 < totalPages) {
      pages.push(<Ellipsis key="ellipsis-2" />);
    }

    if (totalPages > 1) {
      pages.push(
        <PageLink
          key={totalPages}
          page={totalPages}
          isActive={currentPage === totalPages}
          basePath={basePath}
        />,
      );
    }

    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-base">
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={`inline-flex h-10 w-10 items-center justify-center rounded ${currentPage === 1 ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'}`}
      >
        <ChevronLeft />
      </Link>
      {createPageLinks()}
      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={`inline-flex h-10 w-10 items-center justify-center rounded ${currentPage === totalPages ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'}`}
      >
        <ChevronRight />
      </Link>
    </div>
  );
}

function PageLink({
  page,
  isActive,
  basePath,
}: {
  page: number;
  isActive: boolean;
  basePath: string;
}) {
  return (
    <Link
      href={`${basePath}?page=${page}`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded font-medium transition ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {page}
    </Link>
  );
}

function Ellipsis({ key }: { key?: string }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center text-gray-500"
      key={key}
    >
      ...
    </span>
  );
}
