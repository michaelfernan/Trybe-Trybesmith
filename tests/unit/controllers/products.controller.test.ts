import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http'; 
import { Request, Response } from 'express';
import createProduct from '../../../src/controllers/productController';
import * as productService from '../../../src/services/productService';
import { allMockedProducts } from '../../mocks/mockProducts';
import app from '../../../src/app';

chai.use(sinonChai);
chai.use(chaiHttp);
describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should create a product successfully', async function () {

    req.body = { name: 'Product 1', price: '19.99', userId: 1 };

    const mockedProduct = { id: 9, name: 'Product 1', price: '19.99', userId: 1 };
    const addProductStub = sinon.stub(productService, 'default').resolves(mockedProduct);
    await createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(mockedProduct);

    addProductStub.restore();
  });

  it('should handle errors properly', async function () {
    const addProductStub = sinon.stub(productService, 'default').rejects(new Error('Failed to add product'));
  
    try {
      await createProduct(req, res);
    } catch (e) {

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ error: 'Failed to add product' });
    }

    addProductStub.restore();
  });
  
});

describe('GET /products', () => {
  it('should list all products successfully', async () => {
    sinon.stub(productService, 'getAllProducts').resolves(allMockedProducts);

    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(allMockedProducts.length);
    expect(response.body).to.deep.equal(allMockedProducts);
  });
});
