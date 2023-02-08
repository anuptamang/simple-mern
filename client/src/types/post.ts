export interface PostBlockProps {
  id?: string;
  likes?: number;
  _id?: string;
  body: any;
  title: string;
  categories?: string[] | [];
  comments?: Comments[] | [];
  tag?: string[] | [];
  thumbnail?: string;
  userID?: any;
  createdAt?: string;
  __v?: any;
}

export interface LikesProps {
  likes: number | undefined
  setLikes: (likes: number | undefined) => void
}

export interface Comments {
  text: string,
  userId: string,
  likes: number,
  replies: string[] | [],
  _id: string
}