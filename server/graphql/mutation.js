const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString,} = graphql;

const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        roleId: { type: GraphQLID },
      },
      resolve(_, { firstName, lastName, name, email, roleId }) {
        const user = new User({ firstName, lastName, name, email, roleId });

        return user.save();
      },
    },
    addRole: {
      type: RoleType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(_, { name }) {
        const role = new Role({ name });

        return role.save();
      },
    },
  }),
});

module.exports = mutation;