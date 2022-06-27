const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const ErrorType = require('./ErrorType');
const UserType = require('./UserType');

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    isAuth: { type: GraphQLBoolean },
    user: { type: UserType },
    error: { type: ErrorType }
  })
});

module.exports = AuthType;