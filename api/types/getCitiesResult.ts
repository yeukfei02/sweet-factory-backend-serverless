import { list, objectType } from 'nexus';
import { Cities } from './cities';

export const GetCitiesResult = objectType({
  name: 'GetCitiesResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('cities', { type: list(Cities) });
  },
});
