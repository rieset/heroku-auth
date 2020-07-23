export const jwtConstants = {
  secret: process.env.SECRET || 'test-secret',
  tokenName: process.env.TOKEN_NAME || 'heroku-token-name',
  basicValidator: process.env.BASIC_AUTH_VALIDATOR || '',
  API: process.env.API_FOR_ACCESS_TEST || '',
  DEFAULT_USERNAME: process.env.DEFAULT_USERNAME || null,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || null,
};
