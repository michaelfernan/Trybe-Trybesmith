import { Request, Response, NextFunction } from 'express';
import User from '../database/models/user.model';

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const validateName = (name: string | undefined) => {
  if (!name) throw new ValidationError('"name" is required');
  if (typeof name !== 'string') throw new ValidationError('"name" must be a string', 422);
  if (name.length 
    < 3) throw new ValidationError('"name" length must be at least 3 characters long', 422);
};

export const validatePrice = (price: string | undefined) => {
  if (!price) throw new ValidationError('"price" is required');
  if (typeof price !== 'string') throw new ValidationError('"price" must be a string', 422);
  if (price.length 
    < 3) throw new ValidationError('"price" length must be at least 3 characters long', 422);
};

export const userExists = async (userId: number): Promise<boolean> => {
  try {
    const user = await User.findByPk(userId);
    return user !== null;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw new ValidationError('Error checking user existence', 500);
  }
};

export const validateUserId = async (userId: number | undefined) => {
  if (userId === undefined || userId === null) throw new ValidationError('"userId" is required');
  if (typeof userId !== 'number') throw new ValidationError('"userId" must be a number', 422);
  const exists = await userExists(userId);
  if (!exists) throw new ValidationError('"userId" not found', 422);
};
export const validateUserIdPresence = (req: Request) => {
  if (req.body.userId === undefined || req.body.userId === null) {
    throw new ValidationError('"userId" is required');
  }
};

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUserIdPresence(req);
    const { name, price, userId } = req.body;
    validateName(name);
    validatePrice(price);
    await validateUserId(userId as number);
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default validateProduct;
