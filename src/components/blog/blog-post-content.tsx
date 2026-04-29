import { formatDate, calculateReadingTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, ExternalLink } from 'lucide-react';

interface BlogPostContentProps {
  blog: {
    title: string;
    content: string;
    coverImage?: string;
    tags: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
    views: number;
    readingTime?: number;
    source?: string;
  };
}

export function BlogPostContent({ blog }: BlogPostContentProps) {
  const readingTime = blog.readingTime || calculateReadingTime(blog.content);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(blog.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            {blog.views.toLocaleString()} views
          </span>
          {blog.source && (
            <span className="flex items-center gap-1.5">
              <ExternalLink className="h-4 w-4" />
              Source: {blog.source}
            </span>
          )}
        </div>
      </header>

      {blog.coverImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {blog.updatedAt !== blog.createdAt && (
        <p className="text-sm text-muted-foreground mt-8 pt-6 border-t">
          Last updated: {formatDate(blog.updatedAt)}
        </p>
      )}
    </article>
  );
}
