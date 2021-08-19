import { list, objectType } from 'nexus';
import { Products } from './products';

export const GetProductsResult = objectType({
  name: 'GetProductsResult',
  definition(t) {
    t.nonNull.string('message');
    t.field('products', { type: list(Products) });
  },
});
