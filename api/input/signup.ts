import { inputObjectType } from 'nexus';

export const SignupInput = inputObjectType({
  name: 'SignupInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
