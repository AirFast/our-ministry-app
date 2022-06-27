const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;
const { signToken } = require('../shared/token');

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
      async resolve(_, { email, password }) {
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
        const token = signToken({ id: user.id, role: role.name }, '1d');

        return { user, isAuth, hash, token };
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