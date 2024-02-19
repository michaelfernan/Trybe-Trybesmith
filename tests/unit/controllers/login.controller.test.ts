import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import login from '../../../src/controllers/loginController';
import loginService from '../../../src/services/loginService';

chai.use(sinonChai);

describe('LoginController', function () {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockValidateLogin: SinonStub;

  beforeEach(function () {
    req = {
      body: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    mockValidateLogin = sinon.stub(loginService, 'validateLogin');
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return 400 if username or password are missing', async function () {
    await login(req as Request, res as Response);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('should return 401 if username or password are invalid', async function () {
    mockValidateLogin.resolves(null);
    req.body = { username: 'invalid', password: 'invalid' };

    await login(req as Request, res as Response);
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username or password invalid' });
  });

  it('should return 200 and a token if username and password are valid', async function () {
    mockValidateLogin.resolves('valid_token');
    req.body = { username: 'valid', password: 'valid' };

    await login(req as Request, res as Response);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: 'valid_token' });
  });
  
});
