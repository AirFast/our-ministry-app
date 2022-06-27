const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } = graphql;

const AuthType = require('./types/AuthType');
const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const query = new GraphQLObjectType({
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
  }),
});

module.exports = query;