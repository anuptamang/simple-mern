export interface PostBlockProps {
  id?: string;
  likes?: number;
  _id?: string;
  body: any;
  title: string;
  categories?: string[];
  tag?: string[];
  thumbnail?: string;
  userID?: any;
  createdAt?: string;
  __v?: any;
}

export interface LikesProps {
  likes: number | undefined
  setLikes: (likes: number | undefined) => void
}
