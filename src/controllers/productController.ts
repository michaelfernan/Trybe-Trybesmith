import { Request, Response } from 'express';
import addProduct from '../services/productService';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await addProduct(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default createProduct;
