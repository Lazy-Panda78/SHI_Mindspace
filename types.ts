
export interface User {
  id: string;
  email: string;
  // This would typically come from a joined 'profiles' table
  username?: string;
  avatar_url?: string;
}

export interface Profile {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  updated_at: string;
}

export interface Counselor {
  id: string;
  name: string;
  specialties: string[];
  bio: string;
  imageUrl: string;
  availableSlots: string[];
}

export interface Helpline {
  id: string;
  name: string;
  phone: string;
  description: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string; // Anonymous, but linked
  author_username: string; // Anonymous alias
  created_at: string;
  comments: ForumComment[];
}

export interface ForumComment {
  id: string;
  content: string;
  author_id: string;
  author_username: string;
  created_at: string;
}

export interface ResourceArticle {
  title: string;
  content: string;
  summary: string;
}
