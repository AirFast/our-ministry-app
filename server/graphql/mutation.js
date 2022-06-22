const graphql = require('graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = graphql;

const LoginType = require('./types/LoginType');
const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(_, { email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            isAuth: false,
            error: { path: 'email', message: 'Wrong email!'}
          }
        }

        const isAuth = await user.comparePassword(password);
        if (!isAuth) {
          return {
            isAuth,
            error: { path: 'password', message: 'Wrong password!'}
          }
        }

        return { isAuth, token: '2345678', user }
      },
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        roleId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { firstName, lastName, username, email, password, roleId }) {
        const user = new User({ firstName, lastName, username, email, password, roleId });

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