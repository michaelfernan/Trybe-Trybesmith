import { Request, Response } from 'express';
import loginService from '../services/loginService';

async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: '"username" and "password" are required' });
      return;
    }

    const token = await loginService.validateLogin(username, password);

    if (!token) {
      res.status(401).json({ message: 'Username or password invalid' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default login;
