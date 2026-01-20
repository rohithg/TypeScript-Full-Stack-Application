/**
 * tRPC Router with type-safe API endpoints
 * Demonstrates: tRPC, Zod validation, TypeScript inference
 */

import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import type { Post, User } from '../types';

// Initialize tRPC
const t = initTRPC.create();

// Zod schemas for validation
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  published: z.boolean().default(false),
  authorId: z.string().uuid(),
});

const updatePostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
});

const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
});

// In-memory database (for demonstration)
const db = {
  posts: new Map<string, Post>(),
  users: new Map<string, User>(),
};

// Router definition
export const appRouter = t.router({
  // Get all posts with pagination
  getPosts: t.procedure
    .input(paginationSchema)
    .query(async ({ input }) => {
      const allPosts = Array.from(db.posts.values());
      const start = (input.page - 1) * input.pageSize;
      const end = start + input.pageSize;
      
      return {
        data: allPosts.slice(start, end),
        page: input.page,
        pageSize: input.pageSize,
        total: allPosts.length,
        hasMore: end < allPosts.length,
      };
    }),
  
  // Get post by ID
  getPostById: t.procedure
    .input(z.string().uuid())
    .query(async ({ input }) => {
      const post = db.posts.get(input);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    }),
  
  // Create post
  createPost: t.procedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      const post: Post = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      db.posts.set(post.id, post);
      return post;
    }),
  
  // Update post
  updatePost: t.procedure
    .input(updatePostSchema)
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const existing = db.posts.get(id);
      
      if (!existing) {
        throw new Error('Post not found');
      }
      
      const updated: Post = {
        ...existing,
        ...updates,
        updatedAt: new Date(),
      };
      
      db.posts.set(id, updated);
      return updated;
    }),
  
  // Delete post
  deletePost: t.procedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      if (!db.posts.has(input)) {
        throw new Error('Post not found');
      }
      db.posts.delete(input);
      return { success: true };
    }),
  
  // Get user posts
  getUserPosts: t.procedure
    .input(z.string().uuid())
    .query(async ({ input }) => {
      return Array.from(db.posts.values())
        .filter(post => post.authorId === input);
    }),
});

// Export type for client
export type AppRouter = typeof appRouter;
