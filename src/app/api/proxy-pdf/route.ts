import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return NextResponse.json({ error: 'PDF URL is required' }, { status: 400 });
  }

  try {
    const upstream = await fetch(pdfUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}` },
        { status: 502 },
      );
    }

    const contentType =
      upstream.headers.get('content-type') ?? 'application/pdf';

    const headers = new Headers(upstream.headers);

    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', 'inline; filename="document.pdf"');
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(upstream.body as ReadableStream, { headers });
  } catch (err) {
    console.error('Proxy PDF error:', err);

    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
