import { inputObjectType } from 'nexus';

export const CreateCitiesInput = inputObjectType({
  name: 'CreateCitiesInput',
  definition(t) {
    t.nonNull.string('city_name');
    t.nonNull.string('area');
    t.nonNull.int('zone_id');
    t.nonNull.int('user_id');
  },
});
