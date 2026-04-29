import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedArticles, incrementViews } from '@/lib/blog';
import { BlogPostContent } from '@/components/blog/blog-post-content';
import { RelatedArticles } from '@/components/blog/related-articles';
import { extractTextFromHtml } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Not Found',
    };
  }

  const url = `${siteConfig.url}/news/${blog.slug}`;
  const description = extractTextFromHtml(blog.summary);
  const ogImage = blog.coverImage || '/images/og-default.png';

  return {
    title: blog.title,
    description,
    keywords: blog.tags.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description,
      url,
      type: 'article',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [siteConfig.author],
      tags: blog.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
    },
    other: {
      'article:published_time': blog.createdAt,
      'article:modified_time': blog.updatedAt,
      'article:tag': blog.tags.join(','),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, blog.tags);

  await incrementViews(slug);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <BlogPostContent blog={blog} />
        <RelatedArticles articles={relatedArticles} currentSlug={slug} />
      </div>
    </div>
  );
}
