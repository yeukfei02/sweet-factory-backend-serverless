import { list, objectType } from 'nexus';
import { Cities } from './cities';
import { Products } from './products';

export const Machines = objectType({
  name: 'Machines',
  definition(t) {
    t.int('id');
    t.string('machine_name');
    t.int('serial_number');
    t.string('created_at');
    t.string('updated_at');
    t.field('city', { type: Cities });
    t.field('products', { type: list(Products) });
  },
});
