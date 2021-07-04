import jwt from 'jsonwebtoken';
export const validateJwtToken = (token: string): boolean => {
  let validStatus = false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');
    console.log('decoded = ', decoded);

    if (decoded) {
      validStatus = true;
    } else {
      validStatus = false;
    }
  } catch (e) {
    console.log('error = ', e);
    validStatus = false;
  }

  return validStatus;
};
