import { z } from 'zod';

export const blogCreateSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  summary: z
    .string()
    .min(10, 'Summary must be at least 10 characters')
    .max(500, 'Summary cannot exceed 500 characters'),
  content: z
    .string()
    .min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().url('Cover image must be a valid URL').optional().or(z.literal('')),
  tags: z.array(z.string().max(30, 'Each tag cannot exceed 30 characters')).optional().default([]),
  source: z.string().optional(),
  published: z.boolean().optional().default(true),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;

export const blogUpdateSchema = blogCreateSchema.partial();

export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>;

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  tags: z.string().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
