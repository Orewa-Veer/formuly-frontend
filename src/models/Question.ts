export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
export interface Reply {
  _id: string;
  parentId: string;
  // parentId: string | null;
  user: User;
  body: string;
  createdAt: Date;
  upvotes: Upvotes[];
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
  upvotes: Upvotes[];
  isSolved: boolean;
  replyCounter: number;
}
