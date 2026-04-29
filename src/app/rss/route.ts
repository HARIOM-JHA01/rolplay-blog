import { NextResponse } from 'next/server';
import RSS from 'rss';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { siteConfig } from '@/lib/constants';
import { extractTextFromHtml } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  await dbConnect();

  const blogs = await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    feed_url: `${siteConfig.url}/rss`,
    site_url: siteConfig.url,
    language: siteConfig.locale,
    pubDate: new Date(),
  });

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: extractTextFromHtml(blog.summary),
      url: `${siteConfig.url}/news/${blog.slug}`,
      guid: blog._id.toString(),
      date: blog.createdAt,
      categories: blog.tags,
      author: siteConfig.author,
    });
  });

  const xml = feed.xml({ indent: true });

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
