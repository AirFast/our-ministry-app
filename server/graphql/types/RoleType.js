const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const User = require('../../models/user');

const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(require('./UserType')),
      resolve({ id }) {
        return User.find({ roleId: id })
      }
    }
  })
});

module.exports = RoleType;