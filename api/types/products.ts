import { objectType } from 'nexus';
import { Machines } from './machines';
import { Cities } from './cities';

export const Products = objectType({
  name: 'Products',
  definition(t) {
    t.int('id');
    t.string('product_name');
    t.string('product_description');
    t.float('price');
    t.int('quantity');
    t.string('created_at');
    t.string('updated_at');
    t.field('machine', { type: Machines });
    t.field('city', { type: Cities });
  },
});
