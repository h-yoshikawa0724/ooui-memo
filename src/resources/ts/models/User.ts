export type User = {
  name: string;
  authType: 'SOCIAL' | 'MAIL' | 'BOTH';
  emailVerified: boolean;
};
