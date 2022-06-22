const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const UserType = require('./types/UserType');
const RoleType = require('./types/RoleType');

const User = require('../models/user');
const Role = require('../models/role');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
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