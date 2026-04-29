import Link from 'next/link';
import Image from 'next/image';
import { formatShortDate, calculateReadingTime, truncateText } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    coverImage?: string;
    tags: string[];
    createdAt: string | Date;
    views: number;
    readingTime?: number;
  };
}

export function BlogCard({ blog }: BlogCardProps) {
  const readingTime = blog.readingTime || calculateReadingTime(blog.summary);

  return (
    <article className="group flex flex-col h-full rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
      <Link href={`/news/${blog.slug}`} className="flex flex-col h-full">
        {blog.coverImage ? (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}

        <div className="flex flex-col flex-1 p-5">
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h2 className="text-lg font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {truncateText(blog.summary, 120)}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
            <time dateTime={new Date(blog.createdAt).toISOString()}>
              {formatShortDate(blog.createdAt)}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {blog.views.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
