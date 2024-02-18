import express from 'express';
import createProduct from './controllers/productController';

const router = express.Router();

router.post('/products', createProduct);

export default router;
