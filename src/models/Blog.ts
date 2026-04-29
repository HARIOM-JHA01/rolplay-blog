import mongoose, { Document, Model } from 'mongoose';

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  source?: string;
  views: number;
  readingTime?: number;
}

const blogSchema = new mongoose.Schema<IBlogDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.every((tag) => tag.length > 0 && tag.length <= 30);
        },
        message: 'Each tag must be between 1 and 30 characters',
      },
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    source: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    readingTime: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        const result = ret as Record<string, unknown>;
        delete result.__v;
        return result;
      },
    },
    toObject: { virtuals: true },
  }
);

blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ title: 'text', summary: 'text' });

export const Blog: Model<IBlogDocument> =
  mongoose.models.Blog ||
  mongoose.model<IBlogDocument>('Blog', blogSchema);
