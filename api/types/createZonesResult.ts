import { objectType } from 'nexus';

export const CreateZonesResult = objectType({
  name: 'CreateZonesResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
