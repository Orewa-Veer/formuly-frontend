export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  bio: string;
  location: string;
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
  _id: string;
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
export interface Bookmarks {
  parent_id: Question;
}
export type NotificationType = "upvote" | "reply";
export interface Notifications {
  userId: string;
  discussId: Question;
  type: NotificationType;
  date: Date;
}
