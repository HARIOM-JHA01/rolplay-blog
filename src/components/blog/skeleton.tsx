export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-lg border bg-card overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-12 rounded-full bg-muted" />
        </div>
        <div className="h-6 w-full rounded bg-muted mb-2" />
        <div className="h-6 w-3/4 rounded bg-muted mb-4" />
        <div className="h-4 w-full rounded bg-muted mb-2" />
        <div className="h-4 w-2/3 rounded bg-muted mb-4" />
        <div className="flex gap-4 mt-auto pt-3 border-t">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
