import { createProducts, getProducts, getProductById } from '../services/products';
import { validateJwtToken } from '../common/common';

export const createProductsControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const isTokenValid = validateJwtToken(token);
  if (isTokenValid) {
    const productNameInput = args.input.product_name;
    const productDescriptionInput = args.input.product_description;
    const priceInput = args.input.price;
    const quantityInput = args.input.quantity;
    const machineIdInput = args.input.machine_id;
    const cityIdInput = args.input.city_id;
    if (
      productNameInput &&
      productDescriptionInput &&
      priceInput > 0 &&
      quantityInput > 0 &&
      machineIdInput &&
      cityIdInput
    ) {
      await createProducts(
        productNameInput,
        productDescriptionInput,
        priceInput,
        quantityInput,
        machineIdInput,
        cityIdInput,
      );
      response = {
        message: 'createProducts',
      };
    }
  } else {
    response = {
      message: 'Unauthorized, please check request authorization header',
    };
  }

  return response;
};

export const getProductsControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const isTokenValid = validateJwtToken(token);
  if (isTokenValid) {
    const products = await getProducts();
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
      message: 'Unauthorized, please check request authorization header',
    };
  }

  return response;
};

export const getProductByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const token = context.token;
  const isTokenValid = validateJwtToken(token);
  if (isTokenValid) {
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
      message: 'Unauthorized, please check request authorization header',
    };
  }

  return response;
};
