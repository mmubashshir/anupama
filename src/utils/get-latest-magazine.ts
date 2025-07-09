import { CATEGORY } from '~/enum/categories';
import { load as loadHtml } from 'cheerio';

import { fetchLimitedPosts } from '~/services/posts';

import { getPlaceholderImage } from './get-placeholder-image';

interface MagazineCardProps {
  coverImageUrl?: string | undefined;
  ogImageUrl?: string | undefined;
  pdfUrl?: string | undefined;
}

/**
 * Returns the latest magazine PDF URL, or a fallback.
 */
/**
 * Returns the latest magazine PDF URL and related assets.
 */
export async function getLatestMagazinePdfUrl(): Promise<MagazineCardProps> {
  const latestMagazineRaw = await fetchLimitedPosts({
    first: 1,
    filter: { categoryName: CATEGORY.MAGAZINE },
  });

  const post = latestMagazineRaw.posts?.nodes[0];
  const html = post?.content ?? '';
  const $ = loadHtml(html);

  const pdfHref = $('a[href$=".pdf"]').attr('href') ?? undefined;

  const ogImageUrl =
    post?.featuredImage?.node.mediaDetails?.sizes?.find(
      (s) => s?.name === 'medium_large',
    )?.sourceUrl ?? getPlaceholderImage();

  return {
    coverImageUrl:
      post?.featuredImage?.node.sourceUrl ??
      getPlaceholderImage({
        height: 500,
        width: 400,
        text: 'Magazine Image not found!',
      }),
    ogImageUrl,
    pdfUrl: pdfHref,
  };
}
