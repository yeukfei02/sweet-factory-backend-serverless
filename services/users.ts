import bcrypt from 'bcryptjs';
import { PrismaClient, users } from '@prisma/client';

const prisma = new PrismaClient();

export const createUsers = async (email: string, password: string): Promise<users> => {
  const user = await prisma.users.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password),
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return user;
};

export const getUsers = async (): Promise<users[]> => {
  const users = await prisma.users.findMany({});
  return users;
};

export const getUserById = async (id: number): Promise<users | null> => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string): Promise<users | null> => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};
