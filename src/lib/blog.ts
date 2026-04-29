import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { BLOGS_PER_PAGE } from '@/lib/constants';

export async function getBlogs({
  page = 1,
  limit = BLOGS_PER_PAGE,
  search,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string;
} = {}) {
  const conn = await dbConnect();
  if (!conn) {
    return {
      blogs: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }

  const skip = (page - 1) * limit;

  const query: Record<string, unknown> = { published: true };

  if (search) {
    query.$text = { $search: search };
  }

  if (tags) {
    query.tags = { $in: tags.split(',').map((t) => t.trim()) };
  }

  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean(),
    Blog.countDocuments(query),
  ]);

  const serializedBlogs = blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }));

  return {
    blogs: serializedBlogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getBlogBySlug(slug: string) {
  const conn = await dbConnect();
  if (!conn) return null;

  const blog = await Blog.findOne({ slug, published: true }).lean();

  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };
}

export async function getRelatedArticles(slug: string, tags: string[], limit = 3) {
  const conn = await dbConnect();
  if (!conn) return [];

  const related = await Blog.find({
    slug: { $ne: slug },
    published: true,
    tags: { $in: tags },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('title slug tags createdAt')
    .lean();

  return related.map((article) => ({
    ...article,
    _id: article._id.toString(),
    createdAt: article.createdAt.toISOString(),
  }));
}

export async function getAllTags() {
  const conn = await dbConnect();
  if (!conn) return [];

  const tags = await Blog.aggregate([
    { $match: { published: true } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, tag: '$_id', count: 1 } },
  ]);

  return tags;
}

export async function incrementViews(slug: string) {
  const conn = await dbConnect();
  if (!conn) return;
  await Blog.updateOne({ slug }, { $inc: { views: 1 } });
}
