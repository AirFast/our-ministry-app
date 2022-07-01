import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import { ErrorType } from './ErrorType';
import { UserType } from './UserType';

export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    isAuth: { type: GraphQLBoolean },
    user: { type: UserType },
    error: { type: ErrorType }
  })
});