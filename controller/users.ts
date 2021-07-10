import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUsers, getUserByEmail, getUsers, getUserById } from '../services/users';

export const signupControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const emailInput = args.input.email;
  const passwordInput = args.input.password;

  if (emailInput && passwordInput) {
    await createUsers(emailInput, passwordInput);

    response = {
      message: 'signup',
    };
  }

  return response;
};

export const loginControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const emailInput = args.input.email;
  const passwordInput = args.input.password;

  if (emailInput && passwordInput) {
    const usersFromDB = await getUserByEmail(emailInput);
    if (usersFromDB && usersFromDB.password) {
      const isPasswordValid = bcrypt.compareSync(passwordInput, usersFromDB.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { id: uuidv4(), email: emailInput },
          process.env.JWT_SECRET ? process.env.JWT_SECRET : '',
          {
            expiresIn: '1d',
          },
        );

        response = {
          message: 'login',
          token: token,
          user_id: usersFromDB.id,
        };
      } else {
        response = {
          message: 'login error, wrong password',
          token: '',
        };
      }
    }
  }

  return response;
};

export const getUsersControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const users = await getUsers();
  if (users) {
    response = {
      message: 'getUsers',
      users: users,
    };
  } else {
    response = {
      message: 'getUsers',
      users: [],
    };
  }

  return response;
};

export const getUserByIdControllerFunc = async (parent: any, args: any, context: any, info: any): Promise<any> => {
  let response = {};

  const idInput = args.id;
  if (idInput) {
    const user = await getUserById(idInput);
    response = {
      message: 'getUsersById',
      user: user,
    };
  } else {
    response = {
      message: 'getUsersById, no id input',
      user: {},
    };
  }

  return response;
};
