import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { blogCreateSchema } from '@/lib/validations';
import { generateSlug, generateUniqueSlug, calculateReadingTime } from '@/lib/utils';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!ADMIN_API_KEY || apiKey !== ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = blogCreateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: validationResult.error.issues.map((e) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    const { title, summary, content, coverImage, tags, source, published } =
      validationResult.data;

    await dbConnect();

    const baseSlug = generateSlug(title);

    const existingSlugs = await Blog.find(
      { slug: new RegExp(`^${baseSlug}(-\\d+)?$`, 'i') },
      'slug'
    ).lean();

    const slug = generateUniqueSlug(
      baseSlug,
      existingSlugs.map((s) => s.slug)
    );

    const readingTime = calculateReadingTime(content);

    const blog = await Blog.create({
      title,
      slug,
      summary,
      content,
      coverImage,
      tags: tags || [],
      source,
      published: published ?? true,
      readingTime,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.rolplay.ai';

    return NextResponse.json(
      {
        success: true,
        data: {
          slug: blog.slug,
          url: `${siteUrl}/news/${blog.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);

    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
