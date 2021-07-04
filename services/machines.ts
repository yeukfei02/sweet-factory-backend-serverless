import { PrismaClient, machines } from '@prisma/client';

const prisma = new PrismaClient();

export const createMachines = async (machineName: string, serialNumber: number, cityId: number): Promise<machines> => {
  const machine = await prisma.machines.create({
    data: {
      machine_name: machineName,
      serial_number: serialNumber,
      city_id: cityId,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return machine;
};

export const getMachines = async (): Promise<machines[]> => {
  const machines = await prisma.machines.findMany({
    include: {
      cities: true,
      products: true,
    },
  });
  return machines;
};

export const getMachineById = async (id: number): Promise<machines | null> => {
  const machine = await prisma.machines.findUnique({
    where: {
      id: id,
    },
    include: {
      cities: true,
      products: true,
    },
  });
  return machine;
};
