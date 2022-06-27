const { verifyToken } = require('../shared/token');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    req.client = {
      isAuth: false
    };
    return next();
  }

  const isBearer = authorization.split(' ')[0] === 'Bearer';
  const token = authorization.split(' ')[1];

  if(!isBearer || !token || token === '') {
    req.client = {
      isAuth: false
    };
    return next();
  }

  try {
    const decodedToken = verifyToken(token);

    console.log('auth middleware:', decodedToken);

    req.client = {
      isAuth: true,
      ...decodedToken
    };
    return next();
  } catch (error) {
    req.client = {
      isAuth: false,
    };
    return next();
  }
};