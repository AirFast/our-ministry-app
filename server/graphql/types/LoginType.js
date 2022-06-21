const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const ErrorType = require('./ErrorType');

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: () => ({
    isAuth: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    error: { type: ErrorType }
  })
});

module.exports = LoginType;