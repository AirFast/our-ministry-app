const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const Role = require('../../models/role');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: {
      type: require('./RoleType'),
      resolve({ roleId }, __) {
        return Role.findById(roleId);
      }
    }
  })
});

module.exports = UserType;