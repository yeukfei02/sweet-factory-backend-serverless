import { objectType } from 'nexus';
import { Zones } from './zones';

export const Cities = objectType({
  name: 'Cities',
  definition(t) {
    t.int('id');
    t.string('city_name');
    t.string('area');
    t.string('created_at');
    t.string('updated_at');
    t.field('zone', { type: Zones });
  },
});
