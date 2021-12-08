import { PrismaClient, cities } from '@prisma/client';

const prisma = new PrismaClient();

export const createCities = async (cityName: string, area: string, zoneId: number, userId: number): Promise<cities> => {
  const city = await prisma.cities.create({
    data: {
      city_name: cityName,
      area: area,
      zone_id: zoneId,
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return city;
};

export const getCities = async (userId: number): Promise<cities[]> => {
  const cities = await prisma.cities.findMany({
    where: {
      user_id: userId,
    },
    include: {
      zones: true,
    },
  });
  return cities;
};

export const getCityById = async (id: number): Promise<cities | null> => {
  const city = await prisma.cities.findUnique({
    where: {
      id: id,
    },
    include: {
      zones: true,
    },
  });
  return city;
};
