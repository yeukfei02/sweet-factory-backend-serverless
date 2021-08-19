import { objectType } from 'nexus';

export const CreateMachinesResult = objectType({
  name: 'CreateMachinesResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
