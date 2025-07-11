export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  password: string;
}
export interface Reply {
  _id: string;
  parentId: string;
  // parentId: string | null;
  user: User;
  body: string;
  createdAt: Date;
  upvoteCounter: number;
  isSolution?: boolean;
}
export interface Upvotes {
  userId: string;
}
export interface Tags {
  name: string;
  body: string;
}
export interface Question {
  _id: string;
  title: string;
  body: string;
  tags: Tags[];
  createdAt: Date;
  user: User;
  upvoteCounter: number;
  isSolved: boolean;
  replyCounter: number;
}
