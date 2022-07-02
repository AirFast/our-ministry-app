import { MongoServerError } from 'mongodb';
import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { signTokens } from '../shared/token';

import { AuthType } from './types/AuthType';
import { UserType } from './types/UserType';
import { RoleType } from './types/RoleType';
import { SettingType } from './types/SettingType';

import { User } from '../models/user';
import { Role } from '../models/role';
import { Setting } from '../models/setting';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { email, password }, { res }) {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return {
            isAuth: false,
            error: { path: 'email', message: 'Wrong email!' },
          };
        }

        const isAuth = await user.comparePassword(password);
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'password', message: 'Wrong password!' },
          };
        }

        const hash = user.hashTokenVersion();
        const role = await Role.findById(user.roleId);
        const { accessToken, refreshToken } = signTokens({ id: user.id, role: role?.name ?? 'guest', hash });

        res.cookie('X-Access-Token', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.cookie('X-Refresh-Token', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });

        return { isAuth, user };
      },
    },
    logout: {
      type: AuthType,
      async resolve(_, __, { req: { auth: { isAuth, id } }, res }) {
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'auth', message: 'User is already logout!' },
          };
        }

        const user = await User.findById(id);
        if (!user) {
          res.clearCookie('X-Access-Token');
          res.clearCookie('X-Refresh-Token');

          return { isAuth: false };
        }

        user.tokenVersion += 1;
        user.save();

        res.clearCookie('X-Access-Token');
        res.clearCookie('X-Refresh-Token');

        return { isAuth: false, user };
      },
    },
    register: {
      type: AuthType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { name, email, password }, { res }) {
        const role = await Role.findOne({ name: 'guest' });
        const user = new User({ name, email: email.toLowerCase(), password, roleId: role?.id });

        try {
          const result = await user.save();

          const hash = user.hashTokenVersion();
          const { accessToken, refreshToken } = signTokens({ id: user.id, role: role?.name ?? 'guest', hash });

          res.cookie('X-Access-Token', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });

          res.cookie('X-Refresh-Token', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });

          return { isAuth: true, user: result };
        } catch (err) {
          if (err instanceof MongoServerError) {
            return {
              isAuth: false,
              error: {
                path: 'register',
                value: err.keyValue.email,
                message: err.code === 11000 ? `User ${err.keyValue.email} already exists!` : 'Unknown error!',
              },
            };
          }

          return {
            isAuth: false,
            error: {
              path: 'register',
              value: null,
              message: 'Unknown error!',
            },
          };
        }
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        roleId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { name, email, password, roleId }, { req: { auth: { isAuth } } }) {
        if (!isAuth) {
          throw new Error('Unauthenticated!');
        }

        const user = new User({ name, email: email.toLowerCase(), password, roleId });

        return user.save();
      },
    },
    addRole: {
      type: RoleType,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(_, { name }) {
        const role = new Role({ name });

        return role.save();
      },
    },
    addSetting: {
      type: SettingType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLString },
      },
      resolve(_, { name, value }, { req: { auth: { role } } }) {
        if (role !== 'user') {
          throw new Error('Unauthenticated!');
        }

        const setting = new Setting({ name, value });

        return setting.save();
      },
    },
  }),
});
