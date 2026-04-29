export interface IBlog {
  _id: string;
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

export interface BlogInput {
  title: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  source?: string;
  published?: boolean;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  tags?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
