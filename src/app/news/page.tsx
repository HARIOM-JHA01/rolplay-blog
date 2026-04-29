import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getBlogs, getAllTags } from '@/lib/blog';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogGridSkeleton } from '@/components/blog/skeleton';
import { SearchBar } from '@/components/blog/search-bar';
import { TagFilter } from '@/components/blog/tag-filter';
import { Pagination } from '@/components/blog/pagination';
import { siteConfig } from '@/lib/constants';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'News & Articles',
  description: 'Browse all AI-generated reports and analysis.',
  openGraph: {
    title: 'News & Articles',
    description: 'Browse all AI-generated reports and analysis.',
    url: `${siteConfig.url}/news`,
  },
};

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    tags?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const tags = await getAllTags();

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">News & Articles</h1>
          <p className="text-muted-foreground">
            Browse our collection of AI-generated reports and analysis
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <SearchBar />
          <TagFilter tags={tags.map((t) => t.tag)} />
        </div>

        <Suspense fallback={<BlogGridSkeleton count={6} />}>
          <NewsContent
            page={page}
            search={params.search}
            tags={params.tags}
          />
        </Suspense>
      </div>
    </div>
  );
}

async function NewsContent({
  page,
  search,
  tags,
}: {
  page: number;
  search?: string;
  tags?: string;
}) {
  const { blogs, pagination } = await getBlogs({
    page,
    search,
    tags,
  });

  return (
    <>
      <BlogGrid blogs={blogs} />
      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} />
    </>
  );
}
