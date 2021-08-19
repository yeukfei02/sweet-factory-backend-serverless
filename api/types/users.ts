import { objectType } from 'nexus';

export const Users = objectType({
  name: 'Users',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('password');
    t.string('created_at');
    t.string('updated_at');
  },
});
