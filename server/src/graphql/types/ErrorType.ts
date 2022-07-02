import { GraphQLObjectType, GraphQLString } from 'graphql';

export const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    path: { type: GraphQLString },
    value: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
