const { sign } = require('jsonwebtoken');

const signTokens = ({ id, role, hash }) => {
  const accessToken = sign({ id, role }, process.env.APP_SECRET_ACCESS_TOKEN_KEY, { expiresIn: '15m' });
  const refreshToken = sign({ id, hash }, process.env.APP_SECRET_REFRESH_TOKEN_KEY, { expiresIn: '7d' });

  return {
    accessToken,
    refreshToken
  } 
};

module.exports = { signTokens };