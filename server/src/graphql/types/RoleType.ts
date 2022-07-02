import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql';

import { UserType } from './UserType';

import { User } from '../../models/user';

export const RoleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve({ id }) {
        return User.find({ roleId: id });
      },
    },
  }),
});
