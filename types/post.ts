export type MediaItem = {
  type: 'image' | 'video';
  uri: string;
};

export type Post = {
  id: string;
  user: string;
  avatar: string;
  title: string;
  description: string;
  credits: number;
  media: MediaItem[];
  likes: number;
  comments: number;
};
