import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';

import { AuthType } from './types/AuthType';
import { UserType } from './types/UserType';
import { RoleType } from'./types/RoleType';
import { SettingType } from'./types/SettingType';

import { User } from '../models/user';
import { Role } from '../models/role';
import { Setting } from '../models/setting';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    auth: {
      type: AuthType,
      async resolve(_, __, { req: { auth: { isAuth, id } } } ) {
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'auth', message: 'Auth is expired!' }
          }
        }

        const user = await User.findById(id);
        if (!user) {
          return {
            isAuth: false,
            error: { path: 'auth', message: 'User not found!' }
          }
        }

        return { isAuth, user };
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return User.findById(id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    role: {
      type: RoleType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Role.findById(id);
      },
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve() {
        return Role.find({});
      },
    },
    settings: {
      type: new GraphQLList(SettingType),
      resolve() {
        return Setting.find({});
      }
    },
  }),
});