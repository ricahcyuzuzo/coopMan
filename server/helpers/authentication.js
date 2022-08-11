import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({ user }, 'CoopManagement', { expiresIn: '30d' });
}

export const hashingPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

export const comparingPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}
