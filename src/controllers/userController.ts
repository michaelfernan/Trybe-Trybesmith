import { Request, Response } from 'express';
import getAllUsersWithProducts from '../services/userService';

async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await getAllUsersWithProducts();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers: ', error); // Adicionado para ajudar na depuração
    res.status(500).json({ message: 'Internal server error controller' });
  }
}

export default getAllUsers;
