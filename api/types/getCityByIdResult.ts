import { objectType } from 'nexus';
import { Cities } from './cities';

export const GetCityByIdResult = objectType({
  name: 'GetCityByIdResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('city', { type: Cities });
  },
});
