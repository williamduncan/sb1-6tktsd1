import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Post } from '../types';

interface Store {
  currentUser: User | null;
  posts: Post[];
  setCurrentUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  addComment: (postId: string, comment: Comment) => void;
  toggleLike: (postId: string, userId: string) => void;
  updateAvatar: (userId: string, newAvatarUrl: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      currentUser: null,
      posts: [],
      setCurrentUser: (user) => set({ currentUser: user }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      addComment: (postId, comment) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          ),
        })),
      toggleLike: (postId, userId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes.includes(userId)
                    ? post.likes.filter((id) => id !== userId)
                    : [...post.likes, userId],
                }
              : post
          ),
        })),
      updateAvatar: (userId, newAvatarUrl) =>
        set((state) => ({
          currentUser: state.currentUser?.id === userId
            ? { ...state.currentUser, avatar: newAvatarUrl }
            : state.currentUser
        })),
    }),
    {
      name: 'family-connect-storage',
    }
  )
);