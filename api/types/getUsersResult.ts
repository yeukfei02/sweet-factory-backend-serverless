import { list, objectType } from 'nexus';
import { Users } from './users';

export const GetUsersResult = objectType({
  name: 'GetUsersResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('users', { type: list(Users) });
  },
});
