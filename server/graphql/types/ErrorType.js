const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    path: { type: GraphQLString },
    value: { type: GraphQLString },
    message: { type: GraphQLString },
  })
});

module.exports = ErrorType;