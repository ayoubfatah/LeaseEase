// types.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  bookmarks: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string;
  recipient: string;
  body: string;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Property {
  _id: string;
  name: string;
  images: string[];
}

export interface Conversation {
  _id: string;
  participants: User[];
  property?: Property;
  lastMessageAt: string;
  lastMessage?: Message;
  unreadCount: number;
}
