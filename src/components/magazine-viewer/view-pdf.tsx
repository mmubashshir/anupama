'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useWindowWidth } from '~/hooks/use-width';

// import { pdf } from './some.pdf';

const resizeObserverOptions = {};

// Use CDN worker for compatibility with Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ViewPDF({ pdfURL }: { pdfURL: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const containerWidth = useWindowWidth();
  return (
    <div className="border-4 border-red-700">
      <Document
        className="shadow-2xl"
        file={{
          url: 'https://wordpress.anupama.co.in/wp-content/uploads/2025/07/May-2025.pdf',
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          width={containerWidth > 600 ? 500 : containerWidth - 20}
          pageNumber={pageNumber}
        />
      </Document>
      <div className="mt-2 inline-flex gap-x-3 bg-white p-2">
        <button
          className={pageNumber == 1 ? 'opacity-30' : 'opacity-100'}
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber == 1}
        >
          Previous
        </button>
        <div>
          <span className="text-red-400">{pageNumber}</span> / {numPages}
        </div>
        <button
          className={pageNumber == numPages ? 'opacity-30' : 'opacity-100'}
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber == numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
