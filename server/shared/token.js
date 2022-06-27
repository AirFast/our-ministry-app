const jwt = require('jsonwebtoken');

const signToken = (payload, expiresIn) => jwt.sign(payload, process.env.APP_SECRET_TOKEN_KEY, { expiresIn });
const verifyToken = (token) => jwt.verify(token, process.env.APP_SECRET_TOKEN_KEY);

module.exports = { signToken, verifyToken };