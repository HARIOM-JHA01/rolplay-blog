import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { siteConfig } from '@/lib/constants';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  await dbConnect();

  const blogs = await Blog.find({ published: true })
    .select('slug updatedAt')
    .sort({ updatedAt: -1 })
    .lean();

  const staticPages = ['/', '/news', '/about', '/privacy', '/terms'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteConfig.url}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '/' ? 'daily' : page === '/news' ? 'daily' : 'monthly'}</changefreq>
    <priority>${page === '/' ? '1.0' : page === '/news' ? '0.9' : '0.7'}</priority>
  </url>`
    )
    .join('')}
  ${blogs
    .map(
      (blog) => `
  <url>
    <loc>${siteConfig.url}/news/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
