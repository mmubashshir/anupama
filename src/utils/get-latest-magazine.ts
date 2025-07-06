import { CATEGORY } from '~/enum/categories';
import { load as loadHtml } from 'cheerio';

import { fetchLimitedPosts } from '~/services/posts';

interface MagazineQueryResult {
  posts?: {
    nodes: {
      content?: string | null;
    }[];
  };
}

/**
 * Returns the latest magazine PDF URL, or a fallback.
 */
export async function getLatestMagazinePdfUrl(): Promise<string> {
  const heroRaw = (await fetchLimitedPosts({
    first: 1,
    filter: { categoryName: CATEGORY.MAGAZINE },
  })) as MagazineQueryResult;

  const html = heroRaw.posts?.nodes[0]?.content ?? '';
  const $ = loadHtml(html);

  const pdfHref = $('a[href$=".pdf"]').attr('href');

  return (
    pdfHref ??
    'https://wordpress.anupama.co.in/wp-content/uploads/2025/07/May-2025.pdf'
  );
}
