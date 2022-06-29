const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const SettingType = new GraphQLObjectType({
  name: 'Setting',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    value: { type: GraphQLString },
  })
});

module.exports = SettingType;