import { objectType } from 'nexus';

export const CreateProductsResult = objectType({
  name: 'CreateProductsResult',
  definition(t) {
    t.nonNull.string('message');
  },
});
