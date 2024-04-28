export type AuthState = {
  isLogin: boolean;
  login: string;
  type: 'admin' | 'user' | '';
  isSuperAdmin?: boolean;
};
