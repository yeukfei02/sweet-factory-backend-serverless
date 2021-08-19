import { list, objectType } from 'nexus';
import { Cities } from './cities';

export const Zones = objectType({
  name: 'Zones',
  definition(t) {
    t.int('id');
    t.string('zone_name');
    t.string('created_at');
    t.string('updated_at');
    t.field('cities', { type: list(Cities) });
  },
});
