import { objectType } from 'nexus';
import { Users } from './users';

export const GetUsersByIdResult = objectType({
  name: 'GetUsersByIdResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('user', { type: Users });
  },
});
