import { type CATEGORY } from '~/enum/categories';
import Image from 'next/image';
import { fetchLimitedPosts } from '~/services/posts';
import { Container } from './container';

interface AdvertisementProps {
  category: CATEGORY;
}

export default async function Advertisement({ category }: AdvertisementProps) {
  const featuredRaw = await fetchLimitedPosts({
    first: 1,
    filter: {
      categoryName: category,
    },
  });

  const ad = featuredRaw.posts?.nodes[0];

  if (!ad?.addetails?.adImage?.node.mediaItemUrl || !ad.addetails.adLink) {
    return null;
  }

  return (
    <Container className="p-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
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
    </Container>
  );
}
