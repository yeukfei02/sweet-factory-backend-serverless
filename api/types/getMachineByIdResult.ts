import { objectType } from 'nexus';
import { Machines } from './machines';

export const GetMachineByIdResult = objectType({
  name: 'GetMachineByIdResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('machine', { type: Machines });
  },
});
