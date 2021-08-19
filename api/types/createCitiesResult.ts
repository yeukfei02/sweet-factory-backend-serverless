import { objectType } from 'nexus';

export const CreateCitiesResult = objectType({
  name: 'CreateCitiesResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
