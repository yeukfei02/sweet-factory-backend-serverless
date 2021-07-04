import { PrismaClient, products } from '@prisma/client';

const prisma = new PrismaClient();

export const createProducts = async (
  productName: string,
  productDescription: string,
  price: number,
  quantity: number,
  machineId: number,
  cityId: number,
): Promise<products> => {
  const product = await prisma.products.create({
    data: {
      product_name: productName,
      product_description: productDescription,
      price: price,
      quantity: quantity,
      machine_id: machineId,
      city_id: cityId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return product;
};

export const getProducts = async (): Promise<products[]> => {
  const products = await prisma.products.findMany({
    include: {
      machines: true,
      cities: true,
    },
  });
  return products;
};

export const getProductById = async (id: number): Promise<products | null> => {
  const product = await prisma.products.findUnique({
    where: {
      id: id,
    },
    include: {
      machines: true,
      cities: true,
    },
  });
  return product;
};
