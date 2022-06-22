const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const ErrorType = require('./ErrorType');
const UserType = require('./UserType');

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    isAuth: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    user: { type: UserType },
    error: { type: ErrorType }
  })
});

module.exports = LoginType;