import express from 'express';
import createProduct, { listProducts } from './controllers/productController';
import getAllUsers from './controllers/userController';
import loginController from './controllers/loginController';
import validateProduct from './controllers/validation';

const router = express.Router();

router.post('/products', validateProduct, createProduct);
router.get('/products', listProducts);
router.get('/users', getAllUsers);
router.post('/login', loginController);

export default router;
