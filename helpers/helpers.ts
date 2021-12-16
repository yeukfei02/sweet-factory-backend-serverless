import jwt from 'jsonwebtoken';

export const validateJwtToken = (token: string): string => {
  let errorMessage = '';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
    console.log('decoded = ', decoded);

    if (!decoded) {
      errorMessage = 'jwt verify error';
    }
  } catch (e) {
    console.log('error = ', e);
    errorMessage = e.message.toString();
  }

  return errorMessage;
};
