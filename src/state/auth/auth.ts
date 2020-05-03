export interface MessageTypes {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  message: string;
}

export interface Auth {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | { email?: string; password?: string; name?: string };
  user: null | { _id: string; name: string; email: string; chat: MessageTypes[]; createdAt: Date; __v: number };
}
