import { objectType } from 'nexus';
import { Zones } from './zones';

export const GetZonesByIdResult = objectType({
  name: 'GetZonesByIdResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('zone', { type: Zones });
  },
});
