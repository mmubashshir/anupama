import { env } from 'process';
import { createComment } from '~/app/actions/post-comment';
import { BASE_URL } from '~/constants';
import { type CATEGORY } from '~/enum/categories';
import { Clock, User } from 'lucide-react';
import { type Metadata } from 'next';
import Image from 'next/image';
import { after } from 'next/server';

import Sidebar from '~/components/category/sidebar';
import Comment from '~/components/comment';
import { Container } from '~/components/container';
import CreateComment from '~/components/create-comment';
import NativeShareIcon from '~/components/native-share';
import PostNavigation from '~/components/post-navigation';
import { ShareType, SocialIcons } from '~/components/social-icons';
import WPContentRenderer from '~/components/wp-content-renderer';

import { getPlaceholderImage } from '~/utils/get-placeholder-image';

import { createNewViewEvent } from '~/services/popular-posts';
import {
  fetchAllPosts,
  fetchLimitedPosts,
  fetchPostBySlug,
} from '~/services/posts';

export const revalidate = 60; // Revalidate every 1 minute

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
  const pagePath = `${BASE_URL}${category}/${slug}`;
  const [postResponse, postsResponse, allPostsInCategoryResponse] =
    await Promise.allSettled([
      fetchPostBySlug(slug),
      fetchLimitedPosts({
        first: 3,
        filter: {
          categoryName: category,
        },
      }),
      fetchAllPosts({
        filter: {
          categoryName: category,
        },
      }),
    ]);

  if (
    postResponse.status === 'rejected' ||
    postsResponse.status === 'rejected' ||
    allPostsInCategoryResponse.status === 'rejected'
  ) {
    return (
      <Container className="bg-white p-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-red-500">
          Post not found
        </h1>
      </Container>
    );
  }

  after(() => {
    // create a new view event for the post
    if (!(env.NEXT_PUBLIC_MODE === 'production')) return;

    createNewViewEvent(postResponse.value.databaseId)
      .then(() => {
        /** */
      })
      .catch(() => {
        /** */
      });
  });

  const post = postResponse.value;
  const { posts } = postsResponse.value;
  const allPostsInCategory = allPostsInCategoryResponse.value;

  const recentPosts = posts?.nodes ?? [];

  const currentIndex = allPostsInCategory.findIndex((p) => p.slug === slug);
  const previousPostRaw = allPostsInCategory[currentIndex - 1];
  const previousPost =
    currentIndex > 0 && previousPostRaw.slug
      ? {
          ...previousPostRaw,
          slug: previousPostRaw.slug,
          title: previousPostRaw.title ?? '',
          date: previousPostRaw.date ?? '',
          content: previousPostRaw.content ?? '',
          excerpt: previousPostRaw.excerpt ?? '',
        }
      : undefined;

  const nextPostRaw = allPostsInCategory[currentIndex + 1];
  const nextPost =
    currentIndex < allPostsInCategory.length - 1 && nextPostRaw.slug
      ? {
          ...nextPostRaw,
          slug: nextPostRaw.slug,
          title: nextPostRaw.title ?? '',
          date: nextPostRaw.date ?? '',
          content: nextPostRaw.content ?? '',
          excerpt: nextPostRaw.excerpt ?? '',
        }
      : undefined;

  return (
    <Container className="p-4 sm:px-6 lg:px-8 lg:py-10">
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
                  className="aspect-[3/2] w-full object-cover group-hover:brightness-[1.1]"
                />
              </div>

              <h2 className="mb-2 text-3xl font-bold">{post.title} </h2>
              <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
                {/* Author section */}
                <div className="flex items-center gap-1">
                  {post.authorinfo?.writerImage?.node.mediaItemUrl ? (
                    <Image
                      src={post.authorinfo.writerImage.node.mediaItemUrl}
                      alt="Author image"
                      className="h-7 w-7 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <User className="h-4 w-4 stroke-1" />
                  )}

                  <span>
                    {post.authorinfo?.writtenBy ??
                      post.author?.node.name ??
                      'Unknown'}
                  </span>
                </div>

                {/* Date section */}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 stroke-1" />
                  <span>
                    {post.date
                      ? new Date(post.date).toLocaleString('kn-IN', {
                          timeZone: 'Asia/Kolkata',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown date'}
                  </span>
                </div>
              </div>

              <WPContentRenderer content={post.content} />
            </article>
          </div>

          <div className="mb-8 flex items-center justify-end gap-4">
            <SocialIcons
              url={`https://wa.me/whatsappphonenumber/?text=${pagePath}`}
              image={ShareType.WHATSAPP}
            />
            <SocialIcons
              url={`https://www.facebook.com/share.php?u=${pagePath}`}
              image={ShareType.FACEBOOK}
            />
            <NativeShareIcon url={pagePath} image={ShareType.NATIVE} />
          </div>

          {/* Leave a Comment */}
          <div>
            <Comment post={post} />
            <CreateComment
              databaseId={post.databaseId}
              submitComment={createComment}
            />
          </div>
          {/* Post Navigation */}
          <PostNavigation
            previousPost={previousPost}
            nextPost={nextPost}
            category={category}
          />
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
    </Container>
  );
}
