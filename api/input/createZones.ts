import { inputObjectType } from 'nexus';

export const CreateZonesInput = inputObjectType({
  name: 'CreateZonesInput',
  definition(t) {
    t.nonNull.string('zone_name');
  },
});
