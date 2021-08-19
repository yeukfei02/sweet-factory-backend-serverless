import { objectType } from 'nexus';
import { Products } from './products';

export const GetProductByIdResult = objectType({
  name: 'GetProductByIdResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('product', { type: Products });
  },
});
