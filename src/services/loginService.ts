import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';

type UserDetails = {
  id: number;
  username: string;
  password: string;
};

async function validateLogin(username: string, password: string): Promise<string | null> {
  const user = await UserModel.findOne({ where: { username } });

  if (!user) return null;

  const userDetails = user.get() as UserDetails;
  if (!bcrypt.compareSync(password, userDetails.password)) {
    return null;
  }

  const secret = process.env.JWT_SECRET || 'default_secret';

  const token = jwt.sign({ id: userDetails.id, username: userDetails.username }, secret, {
    expiresIn: '1h',
  });

  return token;
}

export default {
  validateLogin,
};
