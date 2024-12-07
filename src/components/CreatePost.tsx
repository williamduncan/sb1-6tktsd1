import React, { useState } from 'react';
import { Image, Video, Send, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MediaUploader } from './MediaUploader';
import type { Post } from '../types';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'text' | 'photo' | 'video'>('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  
  const currentUser = useStore((state) => state.currentUser);
  const addPost = useStore((state) => state.addPost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: content.trim(),
      type: mediaUrl && !mediaError ? mediaType : 'text',
      mediaUrl: mediaUrl && !mediaError ? mediaUrl : undefined,
      createdAt: new Date(),
      likes: [],
      comments: [],
    };

    addPost(newPost);
    setContent('');
    setMediaUrl('');
    setMediaType('text');
    setShowMediaUploader(false);
    setMediaError(false);
  };

  const handleMediaSelect = (url: string) => {
    setMediaUrl(url);
    setMediaError(false);
    setShowMediaUploader(false);
  };

  const handleMediaButtonClick = (type: 'photo' | 'video') => {
    setMediaType(type);
    setShowMediaUploader(true);
  };

  const removeMedia = () => {
    setMediaUrl('');
    setMediaType('text');
    setMediaError(false);
  };

  const handleMediaError = () => {
    setMediaError(true);
    alert('Unable to load media. The file might be restricted or unavailable.');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with your family..."
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        rows={3}
      />
      
      {mediaUrl && (
        <div className="relative mt-3 rounded-lg overflow-hidden">
          {mediaType === 'photo' ? (
            <img 
              src={mediaUrl} 
              alt="" 
              className="w-full h-48 object-cover"
              onError={handleMediaError}
            />
          ) : (
            <video 
              src={mediaUrl} 
              controls 
              className="w-full h-48 object-cover"
              onError={handleMediaError}
            />
          )}
          <button
            type="button"
            onClick={removeMedia}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleMediaButtonClick('photo')}
            className={`p-2 rounded-full ${
              mediaType === 'photo' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Image className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleMediaButtonClick('video')}
            className={`p-2 rounded-full ${
              mediaType === 'video' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Video className="w-5 h-5" />
          </button>
        </div>
        
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {showMediaUploader && (
        <MediaUploader
          type={mediaType}
          onMediaSelect={handleMediaSelect}
          onClose={() => setShowMediaUploader(false)}
        />
      )}
    </form>
  );
}