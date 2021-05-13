export type Provider = 'github';

export type GitHubOAuthParams = {
  code: string;
  state: string;
};

export type OAuthParams = GitHubOAuthParams;

export type OAuthRedirect = {
  redirectUrl: string;
};
