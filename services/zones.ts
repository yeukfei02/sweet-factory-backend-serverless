import { PrismaClient, zones } from '@prisma/client';

const prisma = new PrismaClient();

export const createZones = async (zoneName: string): Promise<zones> => {
  const zone = await prisma.zones.create({
    data: {
      zone_name: zoneName,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return zone;
};

export const getZones = async (): Promise<zones[]> => {
  const zones = await prisma.zones.findMany({
    include: {
      cities: true,
    },
  });
  return zones;
};

export const getZoneById = async (id: number): Promise<zones | null> => {
  const zone = await prisma.zones.findUnique({
    where: {
      id: id,
    },
    include: {
      cities: true,
    },
  });
  return zone;
};
