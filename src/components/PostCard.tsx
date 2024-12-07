import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Post } from '../types';
import { useStore } from '../store/useStore';
import { useUsers } from '../context/UserContext';
import { formatDistanceToNow } from '../utils/dateUtils';
import { Avatar } from './Avatar';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const currentUser = useStore((state) => state.currentUser);
  const toggleLike = useStore((state) => state.toggleLike);
  const { users } = useUsers();
  
  const poster = users[post.userId];

  const handleLike = () => {
    if (currentUser) {
      toggleLike(post.id, currentUser.id);
    }
  };

  if (!poster) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Avatar
          src={poster.avatar}
          alt={poster.name}
          size="md"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">{poster.name}</h3>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(post.createdAt)}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{post.content}</p>
          {post.type !== 'text' && post.mediaUrl && (
            <div className="mt-3 rounded-lg overflow-hidden">
              {post.type === 'photo' ? (
                <img
                  src={post.mediaUrl}
                  alt=""
                  className="w-full max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                  }}
                />
              )}
            </div>
          )}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-500 hover:text-pink-500"
            >
              <Heart
                className={`w-5 h-5 ${
                  currentUser && post.likes.includes(currentUser.id)
                    ? 'fill-pink-500 text-pink-500'
                    : ''
                }`}
              />
              <span>{post.likes.length}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments.length}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}