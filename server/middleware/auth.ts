import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken';
import { signTokens } from '../shared/token';

import { User } from '../models/user';
import { Role } from '../models/role';

interface RequestWithAuth extends Request {
  auth?: {
    isAuth: boolean
    id: string | null
    role: string | null
  }
}

interface JwtPayloadAccessToken extends JwtPayload {
  id: string
  role: string
}

interface JwtPayloadRefreshToken extends JwtPayload {
  id: string
  hash: string
}

export const auth = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
  const accessToken: string = req.cookies['X-Access-Token'];
  const refreshToken: string = req.cookies['X-Refresh-Token'];

  if (!accessToken && !refreshToken) {
    req.auth = { isAuth: false, id: null, role: null };

    return next();
  }

  try {
    const { id, role } = verify(accessToken, process.env.APP_SECRET_ACCESS_TOKEN_KEY!) as JwtPayloadAccessToken;
    req.auth = { isAuth: true, id, role };

    return next();
  } catch (e) {}

  try {
    const { id, hash } = verify(refreshToken, process.env.APP_SECRET_REFRESH_TOKEN_KEY!) as JwtPayloadRefreshToken;
    const user = await User.findById(id);
    const isValidTokenVersion = user?.compareTokenVersion(hash);
    const role = await Role.findById(user?.roleId);

    if (!user || !isValidTokenVersion || !role) {
      req.auth = { isAuth: false, id: null, role: null };

      return next();
    }

    const hashTokenVersion = user.hashTokenVersion();
    const tokens = signTokens({ id: user.id, role: role.name, hash: hashTokenVersion });

    res.cookie('X-Access-Token', tokens.accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
    res.cookie('X-Refresh-Token', tokens.refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });

    req.auth = { isAuth: true, id: user.id, role: role.name };

    return next();
  } catch (e) {
    req.auth = { isAuth: false, id: null, role: null };

    return next();
  }
};