import Link from 'next/link';
import { Suspense } from 'react';
import { getBlogs, getAllTags } from '@/lib/blog';
import { BlogGrid } from '@/components/blog/blog-grid';
import { SearchBar } from '@/components/blog/search-bar';
import { TagFilter } from '@/components/blog/tag-filter';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

export const revalidate = 3600;

export default async function HomePage() {
  const { blogs } = await getBlogs({ limit: 6 });
  const tags = await getAllTags();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Insights
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Stay Ahead with{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Analysis
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover in-depth reports and analysis powered by artificial intelligence.
            From market trends to technology breakthroughs, we cover what matters.
          </p>

          <div className="max-w-xl mx-auto mb-8">
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Read Latest
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-input bg-background font-medium hover:bg-accent transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Generated Content</h3>
              <p className="text-muted-foreground">
                Our reports are generated using advanced AI models for accurate, data-driven insights.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Coverage</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis covering technology, markets, innovation, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Updated Daily</h3>
              <p className="text-muted-foreground">
                Fresh content delivered daily with the latest trends and analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">
                Fresh insights and analysis from our AI team
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {tags.length > 0 && (
            <div className="mb-8">
              <Suspense fallback={<TagFilterFallback />}>
                <TagFilter tags={tags.map((t) => t.tag)} />
              </Suspense>
            </div>
          )}

          <BlogGrid blogs={blogs} />

          {blogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re preparing our first batch of AI-generated reports.
                Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Insight</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our RSS feed to get the latest AI-generated reports delivered directly to your reader.
          </p>
          <Link
            href="/rss"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Subscribe via RSS
          </Link>
        </div>
      </section>
    </div>
  );
}

function SearchBarFallback() {
  return (
    <div className="h-10 w-full rounded-md border border-input bg-background animate-pulse" />
  );
}

function TagFilterFallback() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-8 w-16 rounded-full bg-muted animate-pulse" />
      ))}
    </div>
  );
}
