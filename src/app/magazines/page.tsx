import React from 'react';
import { CATEGORY } from '~/enum/categories';
import { load as loadHtml } from 'cheerio';

import { fetchLimitedPosts } from '~/services/posts';

import { Container } from '../../components/container';
import MagazineCard from '../../components/magazine-card';
import MagazineView from '../../components/magazine-viewer/magazine-view';
import { getPlaceholderImage } from '../../utils/get-placeholder-image';

interface MagazineData {
  title?: string;
  coverImageUrl?: string;
  ogImageUrl?: string;
  pdfUrl?: string;
}

async function getLatestMagazines(): Promise<MagazineData[]> {
  const latestMagazineRaw = await fetchLimitedPosts({
    first: 12,
    filter: { categoryName: CATEGORY.MAGAZINE },
  });

  const posts = latestMagazineRaw.posts?.nodes ?? [];

  return posts.map((post) => {
    const html = post?.content ?? '';
    const $ = loadHtml(html);

    const pdfHref = $('a[href$=".pdf"]').attr('href') ?? undefined;

    const ogImageUrl =
      post?.featuredImage?.node.mediaDetails?.sizes?.find(
        (s) => s?.name === 'medium_large',
      )?.sourceUrl ?? getPlaceholderImage();

    return {
      title: post?.title ?? 'Untitled Magazine',
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
  });
}

export default async function MagazinePage() {
  const magazines = await getLatestMagazines();

  return (
    <Container className="mt-15 flex flex-col p-4 sm:px-6 md:mt-4 lg:px-8">
      <h2 className="text-3xl font-extrabold md:text-4xl">ಮಾಸಪತ್ರಿಕೆ</h2>

      <div className="flex flex-row flex-wrap justify-around md:justify-between">
        {magazines.map((magazine, index) => (
          <div key={index} className="my-4">
            {magazine.pdfUrl !== undefined && (
              <MagazineView pdfUrl={magazine.pdfUrl}>
                <MagazineCard
                  coverImageUrl={magazine.coverImageUrl}
                  title={magazine.title}
                  variant="desktop"
                />
              </MagazineView>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
