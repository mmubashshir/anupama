import { CATEGORY } from '~/enum/categories';
import Image from 'next/image';

import { fetchLimitedPosts } from '~/services/posts';

import { Container } from './container';

export default async function Advertisement() {
  const featuredRaw = await fetchLimitedPosts({
    first: 1,
    filter: {
      categoryName: CATEGORY.ADS,
    },
  });

  const ad = featuredRaw.posts?.nodes[0];

  return (
    <Container className="p-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      {ad?.addetails?.adImage?.node.mediaItemUrl && ad.addetails.adLink ? (
        <div className="flex justify-center">
          <a
            href={ad.addetails.adLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={ad.addetails.adImage.node.mediaItemUrl}
              alt={ad.title ?? 'Advertisement'}
              width={680}
              height={84}
              className="w-[680px] object-cover"
            />
          </a>
        </div>
      ) : (
        <p className="text-center text-gray-500">No advertisement available</p>
      )}
    </Container>
  );
}
