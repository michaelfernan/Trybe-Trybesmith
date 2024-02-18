import { Request, Response } from 'express';
import addProduct from '../services/productService';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await addProduct(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    // Tratar erros adequadamente
  }
};

export default createProduct;
