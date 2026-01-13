'use client';

import { useCallback, useMemo, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useWindowHeight } from '~/hooks/use-height';
import { useWindowWidth } from '~/hooks/use-width';

// Set up PDF.js worker for Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ViewPDF({ pdfURL }: { pdfURL: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Memoize options to prevent unnecessary re-renders
  const options = useMemo(
    () => ({
      cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    [],
  );

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setError(null);
    },
    [],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    // Handle specific transport errors
    if (error.message.includes('Transport destroyed')) {
      console.warn('PDF transport destroyed, this is usually safe to ignore');

      return;
    }

    setError(error.message);
    // Log detailed error for debugging
    console.error('PDF loading error:', error);

    // Capture error in Sentry
    Sentry.captureException(error, {
      tags: { component: 'pdf-viewer' },
      extra: { pdfURL },
    });
  }, []);

  const containerHeight = useWindowHeight();
  const containerWidth = useWindowWidth();

  const handleRetry = () => {
    setError(null);
    setNumPages(null);
    setPageNumber(1);
  };

  if (error) {
    return <PDFErrorDisplay error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="mt-0 inline overflow-hidden bg-white">
      <Document
        file={pdfURL}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <PDFDocumentLoader
            width={containerWidth > 600 ? 600 : containerWidth - 20}
            height={containerHeight - 200}
          />
        }
        options={options}
      >
        <Page
          className="border border-gray-200"
          height={containerHeight - 200}
          pageNumber={pageNumber}
          renderMode="canvas"
          loading={
            <PDFPageLoader
              width={containerWidth > 600 ? 600 : containerWidth - 20}
              height={containerHeight - 200}
            />
          }
        />
      </Document>
      {numPages !== null && (
        <div className="pointer-events-none mt-10 flex w-full items-end justify-center">
          <div className="pointer-events-auto flex w-full max-w-md items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 shadow-lg">
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center justify-center bg-white px-3.5 py-3.5 text-sm font-medium transition-all duration-200 ${
                pageNumber === 1
                  ? 'cursor-not-allowed text-gray-400'
                  : 'text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              disabled={pageNumber === 1}
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">ಪುಟ</span>
              <span className="cursor-pointer rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                {pageNumber}
              </span>
              <span className="text-md font-light text-gray-600">/</span>
              <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                {numPages}
              </span>
            </div>

            <button
              type="button"
              className={`inline-flex cursor-pointer items-center justify-center bg-white px-3.5 py-3.5 text-sm font-medium transition-all duration-200 ${
                pageNumber === numPages
                  ? 'cursor-not-allowed text-gray-400'
                  : 'text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              disabled={pageNumber === numPages}
            >
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading Components
function PDFDocumentLoader({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-12"
      style={{ width, height }}
    >
      <div className="relative">
        {/* Spinning circle */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />
        {/* PDF icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-6 w-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          ಪಿಡಿಎಫ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...
        </p>
        <p className="mt-1 text-sm text-gray-500">Loading PDF Document</p>
      </div>
      <div className="mt-3 flex space-x-1">
        <div className="h-2 w-2 animate-bounce rounded-full" />
        <div
          className="h-2 w-2 animate-bounce rounded-full"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    </div>
  );
}

function PDFPageLoader({ width, height }: { width: number; height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 p-8"
      style={{ width, height }}
    >
      <div className="relative">
        {/* Page skeleton */}
        <div className="relative h-40 w-32 overflow-hidden rounded border-2 border-gray-200 bg-white shadow-sm">
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          {/* Page lines */}
          <div className="space-y-2 p-3">
            <div className="h-2 animate-pulse rounded bg-gray-200" />
            <div className="h-2 animate-pulse rounded bg-gray-200" />
            <div className="h-2 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-gray-600">
          ಪುಟ ಲೋಡ್ ಆಗುತ್ತಿದೆ...
        </p>
        <p className="text-xs text-gray-400">Loading Page</p>
      </div>
    </div>
  );
}

function PDFErrorDisplay({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-4 border-red-200 bg-red-50 p-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-red-800">
        ಪಿಡಿಎಫ್ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ
      </h3>
      <p className="mb-1 text-sm font-medium text-red-700">
        Unable to Load PDF
      </p>
      <p className="mb-6 max-w-md text-center text-xs text-red-600">{error}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex cursor-pointer items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
      </button>
    </div>
  );
}
