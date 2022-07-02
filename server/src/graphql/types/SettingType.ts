import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const SettingType = new GraphQLObjectType({
  name: 'Setting',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});
