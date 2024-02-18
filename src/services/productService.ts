import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

export default async function addProduct(productData: Product): Promise<Product> {
  const product = await ProductModel.create(productData);
  return product.get({ plain: true });
}
export const getAllProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product) => product.get({ plain: true }));
};