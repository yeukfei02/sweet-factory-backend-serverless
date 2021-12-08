import { createProducts, getProducts, getProductById } from '../services/products';
import { validateJwtToken } from '../helpers/helpers';

export const createProductsControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const productNameInput = args.input.product_name;
    const productDescriptionInput = args.input.product_description;
    const priceInput = args.input.price;
    const quantityInput = args.input.quantity;
    const machineIdInput = args.input.machine_id;
    const cityIdInput = args.input.city_id;
    const userIdInput = args.input.user_id;
    if (
      productNameInput &&
      productDescriptionInput &&
      priceInput > 0 &&
      quantityInput > 0 &&
      machineIdInput &&
      cityIdInput &&
      userIdInput
    ) {
      await createProducts(
        productNameInput,
        productDescriptionInput,
        priceInput,
        quantityInput,
        machineIdInput,
        cityIdInput,
        userIdInput,
      );
      response = {
        message: 'createProducts',
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getProductsControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const userIdInput = args.user_id;
    const products = await getProducts(userIdInput);
    if (products) {
      const formattedProducts = products.map((item: any, i: number) => {
        const newObj = {
          machine: item.machines,
          city: item.cities,
        };
        const newItem = Object.assign(item, newObj);
        return newItem;
      });

      response = {
        message: 'getProducts',
        products: formattedProducts,
      };
    } else {
      response = {
        message: 'getProducts',
        products: [],
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};

export const getProductByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const errorMessage = validateJwtToken(token);
  if (!errorMessage) {
    const idInput = args.id;
    if (idInput) {
      const product = await getProductById(idInput);
      if (product) {
        product['machine'] = product['machines'];
        product['city'] = product['cities'];
      }

      response = {
        message: 'getProductById',
        product: product,
      };
    } else {
      response = {
        message: 'getProductById, no id input',
        product: {},
      };
    }
  } else {
    response = {
      message: errorMessage,
    };
  }

  return response;
};
