import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import loginService from '../../../src/services/loginService';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  let findOneStub: sinon.SinonStub;
  let compareSyncStub: sinon.SinonStub;
  let signStub: sinon.SinonStub;

  beforeEach(function () {
    sinon.restore();
    findOneStub = sinon.stub(UserModel, 'findOne');
    compareSyncStub = sinon.stub(bcrypt, 'compareSync');
    signStub = sinon.stub(jwt, 'sign');
  });

  it('should return null if user is not found', async function () {
    findOneStub.resolves(null);

    const result = await loginService.validateLogin('username', 'password');
    expect(result).to.be.null;
  });

  it('should return null if password is incorrect', async function () {
    findOneStub.resolves({ get: () => ({ id: 1, username: 'username', password: 'hashed_password' }) });
    compareSyncStub.returns(false);

    const result = await loginService.validateLogin('username', 'wrong_password');
    expect(result).to.be.null;
  });

  it('should return a token if login is successful', async function () {
    findOneStub.resolves({ get: () => ({ id: 1, username: 'username', password: 'hashed_password' }) });
    compareSyncStub.returns(true);
    signStub.returns('jwt_token');

    const result = await loginService.validateLogin('username', 'correct_password');
    expect(result).to.equal('jwt_token');
    expect(signStub).to.have.been.calledWithMatch({ id: 1, username: 'username' });
  });

});
