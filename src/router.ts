import express from 'express';
import createProduct, { listProducts } from './controllers/productController';
import getAllUsers from './controllers/userController';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', listProducts);
router.get('/users', getAllUsers);

export default router;
