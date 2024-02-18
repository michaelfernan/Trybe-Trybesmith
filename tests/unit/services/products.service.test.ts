import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'; 
import addProduct from '../../../src/services/productService';
import ProductModel from '../../../src/database/models/product.model';
import * as mockProducts from '../../mocks/mockProducts';

describe('ProductsService', function () {
  let createStub: SinonStub;

  beforeEach(function () {
    createStub = sinon.stub(ProductModel, 'create');
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should add a product successfully', async function () {
    const createdProduct: any = { get: sinon.stub().returns(mockProducts.mockedProduct1) }; 
    createStub.resolves(createdProduct as any);
    const newProduct = await addProduct(mockProducts.mockedProduct1);

    expect(createStub.calledOnce).to.be.true;
    expect(createStub.calledWith(mockProducts.mockedProduct1)).to.be.true;

    expect(newProduct).to.deep.equal(mockProducts.mockedProduct1);
  });
});
