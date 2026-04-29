import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/constants';

export const revalidate = 86400;

export function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow admin and API endpoints
Disallow: /api/
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
