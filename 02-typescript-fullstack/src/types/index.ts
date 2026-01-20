/**
 * Type definitions for the application
 * Demonstrates: TypeScript advanced types, generics, utility types
 */

// Base types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

// Utility types
export type CreatePostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'author'>;
export type UpdatePostInput = Partial<CreatePostInput> & { id: string };
export type PostWithAuthor = Post & { author: User };

// Advanced types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Discriminated unions
export type ApiEvent = 
  | { type: 'POST_CREATED'; payload: Post }
  | { type: 'POST_UPDATED'; payload: Post }
  | { type: 'POST_DELETED'; payload: { id: string } }
  | { type: 'USER_REGISTERED'; payload: User };

// Generic types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Type guards
export function isPost(obj: any): obj is Post {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'title' in obj &&
    'content' in obj
  );
}

export function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'email' in obj
  );
}

// Branded types for type safety
export type UserId = string & { readonly brand: unique symbol };
export type PostId = string & { readonly brand: unique symbol };

export function createUserId(id: string): UserId {
  return id as UserId;
}

export function createPostId(id: string): PostId {
  return id as PostId;
}
