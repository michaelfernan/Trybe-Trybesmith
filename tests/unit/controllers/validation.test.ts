import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';
import validateProduct from '../../../src/controllers/validation';
import User from '../../../src/database/models/user.model';

chai.use(sinonChai);

describe('Validation Controller', function () {

  describe('validateProduct', function () {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let mockUserExists: SinonStub;

    beforeEach(function () {
      req = { body: {} };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      next = sinon.spy();

      mockUserExists = sinon.stub(User, 'findByPk').resolves(true as any);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('should call next function if validation is successful', async function () {
      req.body = { name: 'Valid Name', price: '123', userId: 1 };

      await validateProduct(req as Request, res as Response, next);

      expect(next).to.have.been.calledOnce;
    });
  });
});
