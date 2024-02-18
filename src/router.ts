import express from 'express';
import createProduct, { listProducts } from './controllers/productController';

const router = express.Router();

router.post('/products', createProduct);

router.get('/products', listProducts);

export default router;
