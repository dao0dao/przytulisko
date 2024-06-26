export interface AuthorizationStateInterface  {
    isLogin: boolean;
    login: string;
    type: 'admin' | 'user' | '';
    isSuperAdmin?: boolean;
    error: string | null
  };
  