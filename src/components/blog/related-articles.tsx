import Link from 'next/link';
import { formatShortDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RelatedArticle {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  createdAt: string | Date;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentSlug: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const filtered = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <aside className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="space-y-4">
        {filtered.map((article) => (
          <Link
            key={article._id}
            href={`/news/${article.slug}`}
            className="group block p-4 rounded-lg border hover:bg-accent transition-colors"
          >
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <time className="text-xs text-muted-foreground mt-2 block">
              {formatShortDate(article.createdAt)}
            </time>
          </Link>
        ))}
      </div>
    </aside>
  );
}
