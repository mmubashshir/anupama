import { BASE_URL } from '~/constants';
import { type CATEGORY } from '~/enum/categories';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Tag,
  User,
} from 'lucide-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from '~/components/category/sidebar';
import Comment from '~/components/comment';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import {
  fetchAllPosts,
  fetchLimitedPosts,
  fetchPostBySlug,
} from '~/services/posts';

interface PageParams {
  params: Promise<{ slug: string; category: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  const post = await fetchPostBySlug(resolvedParams.slug);

  const title = post.title ?? 'Anupama Monthly';
  const description =
    typeof post.content === 'string'
      ? post.content.replace(/<[^>]+>/g, '').slice(0, 150)
      : 'Anupama Monthly Magazine - Empowering Women Through Words.';

  const ogImage = post.featuredImage?.node.mediaDetails?.sizes?.find(
    (size) => size?.name === 'medium_large',
  );
  const firstImage =
    post.featuredImage?.node.mediaDetails?.sizes?.[0]?.sourceUrl ??
    getPlaceholderImage({ text: title });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${resolvedParams.category}/${resolvedParams.slug}`,
      siteName: 'Anupama Monthly',
      locale: 'kn_IN',
      type: 'article',
      images: [
        {
          url: ogImage?.sourceUrl ?? firstImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      card: 'summary_large_image',
      description,
      images: [ogImage?.sourceUrl ?? firstImage],
    },
  };
}

export default async function Blog({ params }: PageParams) {
  const { slug, category } = await params;
  const post = await fetchPostBySlug(slug);

  const { posts } = await fetchLimitedPosts({
    first: 3,
    filter: {
      categoryName: category,
    },
  });
  const recentPosts = posts?.nodes ?? [];

  const allPostsInCategory = await fetchAllPosts({
    filter: {
      categoryName: category,
    },
  });

  const currentIndex = allPostsInCategory.findIndex((p) => p.slug === slug);
  const previousPost =
    currentIndex > 0 ? allPostsInCategory[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPostsInCategory.length - 1
      ? allPostsInCategory[currentIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-12 md:px-20 md:py-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-12">
            <article key={post.title} className="pb-8">
              <div className="mb-4 overflow-hidden">
                <Image
                  src={
                    post.featuredImage?.node.sourceUrl ?? getPlaceholderImage()
                  }
                  alt={post.title ?? ''}
                  width={800}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>

              <h2 className="mb-2 text-3xl font-bold">{post.title} </h2>

              <div className="mb-4 flex flex-wrap gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="h-5 w-5 text-red-500" />
                  <Link href="#" className="duration-300 hover:text-red-500">
                    <span>{post.author?.node.name}</span>
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <span>
                    {post.date
                      ? new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown date'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-5 w-5 text-red-500" />
                  <span>
                    {post.categories?.nodes.map((itm) => itm.name).join(', ')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-5 w-5 text-red-500" />
                  <span>{post.commentCount} Comments</span>
                </div>
              </div>

              <WPContentRenderer content={post.content} />
            </article>
          </div>

          {/* Leave a Comment */}
          <Comment post={post} />

          {/* Post Navigation */}
          <div className="mt-15 flex flex-col justify-between gap-8 pt-4 md:flex-row">
            {/* Previous Post */}
            {previousPost ? (
              <Link
                href={`/${category}/${previousPost.slug}`}
                className="group flex items-center space-x-4"
              >
                <div className="grid h-12 w-12 place-items-center border border-gray-200">
                  <span className="text-xl text-gray-500 transition-transform group-hover:-translate-x-1">
                    <ChevronLeft />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-red-600 uppercase">
                    Previous Post
                  </p>
                  <h4 className="leading-snug font-semibold text-black">
                    {previousPost.title}
                  </h4>
                </div>
              </Link>
            ) : null}

            {/* Next Post */}
            {nextPost ? (
              <Link
                href={`/${category}/${nextPost.slug}`}
                className="group flex items-center justify-end space-x-4 text-right"
              >
                <div>
                  <p className="text-sm text-red-600 uppercase">Next Post</p>
                  <h4 className="leading-snug font-semibold text-black">
                    {nextPost.title}
                  </h4>
                </div>
                <div className="grid h-12 w-12 place-items-center border border-gray-200">
                  <span className="text-xl text-gray-500 transition-transform group-hover:translate-x-1">
                    <ChevronRight />
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar
          recentPosts={recentPosts.map((post) => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            date: post.date,
            featuredImage: post.featuredImage
              ? {
                  node: {
                    sourceUrl:
                      post.featuredImage.node.sourceUrl ??
                      getPlaceholderImage(),
                  },
                }
              : null,
          }))}
          category={category as CATEGORY}
        />
      </div>
    </div>
  );
}
