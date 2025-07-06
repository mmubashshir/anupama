import { CATEGORY } from '~/enum/categories';
import { load as loadHtml } from 'cheerio';

import { fetchLimitedPosts } from '~/services/posts';

interface MagazineCardProps {
  coverImageUrl?: string | undefined;
  pdfUrl?: string | undefined;
}

/**
 * Returns the latest magazine PDF URL, or a fallback.
 */
export async function getLatestMagazinePdfUrl(): Promise<MagazineCardProps> {
  const latestMagazineRaw = await fetchLimitedPosts({
    first: 1,
    filter: { categoryName: CATEGORY.MAGAZINE },
  });

  const html = latestMagazineRaw.posts?.nodes[0]?.content ?? '';
  const $ = loadHtml(html);

  const pdfHref = $('a[href$=".pdf"]').attr('href');

  return {
    coverImageUrl:
      latestMagazineRaw.posts?.nodes[0].featuredImage?.node.sourceUrl ??
      undefined,
    pdfUrl: pdfHref,
  };
}
