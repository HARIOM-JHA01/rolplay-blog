import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { paginationSchema } from '@/lib/validations';
import { BLOGS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const params = paginationSchema.parse({
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || BLOGS_PER_PAGE,
      search: searchParams.get('search'),
      tags: searchParams.get('tags'),
    });

    const skip = (params.page - 1) * params.limit;

    const query: Record<string, unknown> = { published: true };

    if (params.search) {
      query.$text = { $search: params.search };
    }

    if (params.tags) {
      query.tags = { $in: params.tags.split(',').map((t) => t.trim()) };
    }

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(params.limit)
        .select('-content')
        .lean(),
      Blog.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / params.limit);

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
