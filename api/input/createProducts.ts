import { inputObjectType } from 'nexus';

export const CreateProductsInput = inputObjectType({
  name: 'CreateProductsInput',
  definition(t) {
    t.nonNull.string('product_name');
    t.nonNull.string('product_description');
    t.nonNull.float('price');
    t.nonNull.int('quantity');
    t.nonNull.int('machine_id');
    t.nonNull.int('city_id');
    t.nonNull.int('user_id');
  },
});
