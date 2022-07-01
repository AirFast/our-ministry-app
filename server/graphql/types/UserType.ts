import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

import { RoleType } from './RoleType';

import { Role } from '../../models/role';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    tokenVersion: { type: GraphQLInt },
    role: {
      type: RoleType,
      resolve({ roleId }) {
        return Role.findById(roleId);
      }
    }
  })
});