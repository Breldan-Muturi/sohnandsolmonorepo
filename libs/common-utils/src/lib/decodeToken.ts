import * as jwt from 'jsonwebtoken';

export function decodeToken(token: string) {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Error decoding this token');
  }
}
