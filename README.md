# Rolplay AI Blog Platform

A production-ready AI blog platform built with Next.js App Router, TypeScript, TailwindCSS, MongoDB, and Mongoose.

## Features

- **AI-Powered Content Pipeline**: External cron job API submits AI-generated reports
- **SEO Optimized**: Dynamic metadata, OpenGraph, Twitter Cards, canonical URLs
- **WhatsApp Sharing Ready**: Proper og:title, og:description, og:image tags
- **Responsive Design**: Mobile-first, dark mode support, professional typography
- **Performance**: ISR/revalidation, server rendering, image optimization, caching
- **Security**: API key authentication for create endpoint
- **Full-Text Search**: MongoDB text search with debounced client-side search
- **Tag Filtering**: Filter articles by tags
- **Pagination**: Server-side pagination
- **Reading Time**: Automatic reading time estimation
- **View Counter**: Track article views
- **Related Articles**: Tag-based related article suggestions
- **RSS Feed**: Auto-generated RSS feed
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: SEO-friendly robots configuration

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | TailwindCSS v4 |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Validation | Zod |
| UI Components | Radix UI + custom shadcn-style components |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Homepage
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles + CSS variables
│   ├── news/
│   │   ├── page.tsx            # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic blog post page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy
│   ├── terms/
│   │   └── page.tsx            # Terms of service
│   ├── sitemap.xml/
│   │   └── route.ts            # Dynamic sitemap
│   ├── rss/
│   │   └── route.ts            # RSS feed
│   ├── robots.txt/
│   │   └── route.ts            # Robots.txt
│   └── api/
│       ├── blogs/
│       │   ├── create/
│       │   │   └── route.ts    # POST: Create blog (protected)
│       │   ├── [slug]/
│       │   │   └── route.ts    # GET: Get blog by slug
│       │   └── route.ts        # GET: List blogs
│       └── health/
│           └── route.ts        # GET: Health check
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Site header with navigation
│   │   └── footer.tsx          # Site footer
│   ├── blog/
│   │   ├── blog-card.tsx       # Blog card component
│   │   ├── blog-grid.tsx       # Blog grid layout
│   │   ├── blog-post-content.tsx # Article content renderer
│   │   ├── related-articles.tsx  # Related articles sidebar
│   │   ├── search-bar.tsx      # Debounced search input
│   │   ├── tag-filter.tsx      # Tag filter buttons
│   │   ├── pagination.tsx      # Pagination component
│   │   └── skeleton.tsx        # Loading skeletons
│   └── ui/
│       ├── button.tsx          # Button component
│       ├── card.tsx            # Card components
│       ├── badge.tsx           # Badge component
│       └── input.tsx           # Input component
├── lib/
│   ├── db.ts                   # MongoDB connection singleton
│   ├── blog.ts                 # Server-side blog data functions
│   ├── utils.ts                # Utility functions (slug, dates, etc.)
│   ├── cn.ts                   # Class merging utility
│   ├── validations.ts          # Zod schemas
│   ├── constants.ts            # Site configuration
│   └── use-debounce.ts         # Debounce hook
├── models/
│   └── Blog.ts                 # Mongoose Blog model
├── types/
│   └── index.ts                # TypeScript type definitions
└── data/
    └── seed.ts                 # Sample seed data
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- npm, yarn, pnpm, or bun

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Connection String from MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blog?retryWrites=true&w=majority

# Generate a secure API key: openssl rand -hex 32
ADMIN_API_KEY=your-secret-api-key-here

# Your production URL
NEXT_PUBLIC_SITE_URL=https://blog.rolplay.ai
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0 is fine for development)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Reference

### Create Blog Post

```http
POST /api/blogs/create
Content-Type: application/json
x-api-key: YOUR_API_KEY

{
  "title": "Article Title",
  "summary": "Brief summary (10-500 chars)",
  "content": "<p>HTML content</p>",
  "coverImage": "https://example.com/image.jpg",
  "tags": ["AI", "Technology"],
  "source": "Rolplay AI",
  "published": true
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "slug": "article-title",
    "url": "https://blog.rolplay.ai/news/article-title"
  }
}
```

### List Blog Posts

```http
GET /api/blogs?page=1&limit=10&search=query&tags=AI,Technology
```

**Response:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Get Blog by Slug

```http
GET /api/blogs/{slug}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "...",
    "slug": "...",
    "summary": "...",
    "content": "...",
    "tags": [...],
    "createdAt": "...",
    "updatedAt": "...",
    "views": 0,
    "readingTime": 5
  }
}
```

### Health Check

```http
GET /api/health
```

## Cron Job Integration

Your external AI worker can publish articles like this:

```bash
curl -X POST https://blog.rolplay.ai/api/blogs/create \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ADMIN_API_KEY" \
  -d '{
    "title": "AI Market Report - April 2026",
    "summary": "Monthly analysis of AI market trends and developments.",
    "content": "<h1>AI Market Report</h1><p>...</p>",
    "coverImage": "https://...",
    "tags": ["AI", "Markets", "Analysis"],
    "source": "AI Worker v2"
  }'
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add environment variables:
   - `MONGODB_URI`
   - `ADMIN_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy

### Environment Variables on Vercel

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `ADMIN_API_KEY` | Secret key for API authentication |
| `NEXT_PUBLIC_SITE_URL` | Your production URL |

## Multilingual Support (Future)

The codebase is structured for easy multilingual expansion:

- All text content is in separate components
- URL structure supports locale prefix (`/[locale]/news/[slug]`)
- Metadata generation can be locale-aware
- Content model can store translations

To add multilingual support:
1. Add locale to URL via middleware
2. Extend Blog model with translation fields
3. Create locale-specific content dictionaries

## Performance Optimizations

- **ISR**: Blog pages revalidate every hour (`revalidate: 3600`)
- **Server Components**: All data fetching uses Server Components
- **MongoDB Indexes**: Optimized indexes for common queries
- **Connection Pooling**: MongoDB connection singleton prevents connection storms
- **Debounced Search**: Client-side search is debounced to reduce API calls
- **Image Optimization**: Next.js Image component with proper sizing

## SEO Features

- Dynamic `generateMetadata()` for each article
- OpenGraph tags for Facebook/WhatsApp sharing
- Twitter Card tags
- Canonical URLs
- XML sitemap with all articles
- RSS feed
- robots.txt
- Semantic HTML structure
- Proper heading hierarchy

## License

MIT
