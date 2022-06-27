const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;
const { signTokens } = require('../shared/token');

const AuthType = require('./types/AuthType');
const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, { email, password }, { res }) {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return {
            isAuth: false,
            error: { path: 'email', message: 'Wrong email!' }
          }
        }

        const isAuth = await user.comparePassword(password);
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'password', message: 'Wrong password!' }
          }
        }

        const hash = await user.hashTokenVersion();
        const role = await Role.findById(user.roleId);
        const { accessToken, refreshToken } = signTokens({ id: user.id, role: role.name, hash });

        res.cookie('x-access-token', accessToken, { httpOnly: true, secure: true });
        res.cookie('x-refresh-token', refreshToken, { httpOnly: true, secure: true });

        return { isAuth, user };
      },
    },
    logout: {
      type: AuthType,
      async resolve(_, __, { req: { auth: { isAuth, id } }, res }) {
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'auth', message: 'User is already logout!' }
          }
        }

        const user = await User.findById(id);
        user.tokenVersion += 1;
        user.save();

        res.clearCookie('x-access-token');
        res.clearCookie('x-refresh-token');

        return { isAuth: false, user };
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        roleId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { name, email, password, roleId }, { client: { isAuth } }) {
        if(!isAuth) {
          throw new Error('Unauthenticated!')
        }

        const user = new User({ name, email: email.toLowerCase(), password, roleId });

        return user.save();
      },
    },
    addRole: {
      type: RoleType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { name }) {
        const role = new Role({ name });

        return role.save();
      },
    },
  }),
});

module.exports = mutation;