const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString } = graphql;
const { signToken } = require('../shared/token');

const AuthType = require('./types/AuthType');
const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    refresh: {
      type: AuthType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { id }) {
        if(id === '') {
          return {
            isAuth: false,
            error: { path: 'auth', message: 'Token generation error!'}
          };
        }

        const token = signToken({ id }, '1m');

        return { isAuth: true, token };
      }
    },
    auth: {
      type: AuthType,
      args: {
        hash: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(_, { hash }, { client: { isAuth, id } }) {
        if(!isAuth) {
          return { 
            isAuth,
            error: { path: 'auth', message: 'Unauthenticated!' }
          };
        }

        console.log('auth');

        const user = await User.findById(id);
        if (!user) {
          return {
            isAuth: false,
            error: { path: 'auth', message: 'Such user does not exist!' }
          }
        }

        const isInSession = user.compareTokenVersion(hash);
        if (!isInSession) {
          return {
            isAuth: isInSession,
            error: { path: 'auth', message: 'This user\'s session has ended!' }
          }
        }

        const role = await Role.findById(user.roleId);
        const token = signToken({ id: user.id, role: role.name }, '1d');

        return { isAuth: isInSession, token };
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(_, { id }) {
        return User.findById(id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(_, __) {
        return User.find({});
      },
    },
    role: {
      type: RoleType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Role.findById(id);
      },
    },
    roles: {
      type: new GraphQLList(RoleType),
      resolve(_, __) {
        return Role.find({});
      },
    },
  }),
});

module.exports = query;