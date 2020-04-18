export interface Auth {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | { email?: string; password?: string; name?: string };

  user: null | { _id: string; name: string; email: string; createdAt: Date; __v: number };
}
