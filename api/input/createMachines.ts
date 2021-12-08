import { inputObjectType } from 'nexus';

export const CreateMachinesInput = inputObjectType({
  name: 'CreateMachinesInput',
  definition(t) {
    t.nonNull.string('machine_name');
    t.nonNull.int('serial_number');
    t.nonNull.int('city_id');
    t.nonNull.int('user_id');
  },
});
