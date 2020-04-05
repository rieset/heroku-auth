export const jwtConstants = {
  secret: process.env.SECRET || 'test-secret',
  tokenName: process.env.TOKEN_NAME || 'heroku-token-name',
  basikValidator: process.env.BASIC_AUTH_VALIDATOR || 'https://jira.wavesplatform.com/rest/api/2/mypermissions'
};
