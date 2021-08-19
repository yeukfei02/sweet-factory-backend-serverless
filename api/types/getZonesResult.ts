import { list, objectType } from 'nexus';
import { Zones } from './zones';

export const GetZonesResult = objectType({
  name: 'GetZonesResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('zones', { type: list(Zones) });
  },
});
