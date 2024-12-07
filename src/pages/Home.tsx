import React from 'react';
import { CreatePost } from '../components/CreatePost';
import { PostCard } from '../components/PostCard';
import { useStore } from '../store/useStore';

export function Home() {
  const posts = useStore((state) => state.posts);

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
}