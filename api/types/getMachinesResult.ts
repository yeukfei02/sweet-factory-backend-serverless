import { list, objectType } from 'nexus';
import { Machines } from './machines';

export const GetMachinesResult = objectType({
  name: 'GetMachinesResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('machines', { type: list(Machines) });
  },
});
