// GitHubから渡されたクエリパラメータをそのままAPIに渡したいので、スネークケースのまま
export type GitHubOAuthParams = {
  // eslint-disable-next-line camelcase
  access_token: string;
  // eslint-disable-next-line camelcase
  token_type: string;
};

export type OAuthParams = GitHubOAuthParams;

export type OAuthRedirect = {
  redirectUrl: string;
};
