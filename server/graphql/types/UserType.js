const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const Role = require('../../models/role');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tokenVersion: { type: GraphQLInt },
    role: {
      type: require('./RoleType'),
      resolve({ roleId }, __) {
        return Role.findById(roleId);
      }
    }
  })
});

module.exports = UserType;