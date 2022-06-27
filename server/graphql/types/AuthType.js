const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const ErrorType = require('./ErrorType');
const UserType = require('./UserType');

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    user: { type: UserType },
    isAuth: { type: GraphQLBoolean },
    hash: { type: GraphQLString },
    token: { type: GraphQLString },
    error: { type: ErrorType }
  })
});

module.exports = AuthType;