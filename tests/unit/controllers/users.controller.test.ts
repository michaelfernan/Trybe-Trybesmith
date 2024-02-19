import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import getAllUsers from '../../../src/controllers/userController';
import * as userService from '../../../src/services/userService';

chai.use(sinonChai);

describe('UsersController', function () {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockGetAllUsersWithProducts: sinon.SinonStub;

  beforeEach(function () {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    mockGetAllUsersWithProducts = sinon.stub(userService, 'default');
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return all users successfully', async function () {
    const mockedUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    mockGetAllUsersWithProducts.resolves(mockedUsers);

    await getAllUsers(req as Request, res as Response);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockedUsers);
  });

  it('should handle errors properly', async function () {
    mockGetAllUsersWithProducts.rejects(new Error('Internal server error'));

    await getAllUsers(req as Request, res as Response);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error controller' });
  });
});
