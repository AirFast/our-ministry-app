const { verify } = require('jsonwebtoken');
const { signTokens } = require('../shared/token');

const User = require('../models/user');
const Role = require('../models/role');

module.exports = async (req, res, next) => {
  const accessToken = req.cookies['x-access-token'];
  const refreshToken = req.cookies['x-refresh-token'];

  if (!accessToken && !refreshToken) {
    req.auth = { isAuth: false, id: null, role: null };

    return next();
  }

  try {
    const { id, role } = verify(accessToken, process.env.APP_SECRET_ACCESS_TOKEN_KEY);
    req.auth = { isAuth: true, id, role };

    return next();
  } catch (e) {}

  try {
    const { id, hash } = verify(refreshToken, process.env.APP_SECRET_REFRESH_TOKEN_KEY);
    const user = await User.findById(id);
    const isValidTokenVersion = user.compareTokenVersion(hash);

    if (!user || !isValidTokenVersion) {
      req.auth = { isAuth: false, id: null, role: null };

      return next();
    }

    const role = await Role.findById(user.roleId);
    const hashTokenVersion = await user.hashTokenVersion();
    const tokens = signTokens({ id: user.id, role: role.name, hash: hashTokenVersion });

    res.cookie('x-access-token', tokens.accessToken, { httpOnly: true, secure: true });
    res.cookie('x-refresh-token', tokens.refreshToken, { httpOnly: true, secure: true });

    req.auth = { isAuth: true, id: user.id, role: role.name };

    return next();
  } catch (e) {
    req.auth = { isAuth: false, id: null, role: null };

    return next();
  }
};