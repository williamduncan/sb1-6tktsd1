export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'child' | 'parent' | 'family';
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  type: 'text' | 'photo' | 'video';
  mediaUrl?: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}