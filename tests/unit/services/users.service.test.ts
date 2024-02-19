import { expect } from 'chai';
import sinon from 'sinon';
import getAllUsersWithProducts from '../../../src/services/userService';
import UserModel from '../../../src/database/models/user.model';
describe('UsersService', function () {
  let findAllStub: sinon.SinonStub;

  beforeEach(function () {
    sinon.restore();
    findAllStub = sinon.stub(UserModel, 'findAll');
  });

  it('should return all users with their products', async function () {

    const mockedUsers = [
      {
        get: () => ({
          username: 'user1',
          productIds: [{ id: 1 }, { id: 2 }]
        })
      },
      {
        get: () => ({
          username: 'user2',
          productIds: [{ id: 3 }]
        })
      }
    ];
    findAllStub.resolves(mockedUsers as any);

    const users = await getAllUsersWithProducts();

    expect(findAllStub.calledOnce).to.be.true;
    expect(users).to.be.an('array');
    expect(users).to.have.lengthOf(2);
    expect(users[0].username).to.equal('user1');
    expect(users[0].productIds).to.deep.equal([1, 2]);
    expect(users[1].username).to.equal('user2');
    expect(users[1].productIds).to.deep.equal([3]);
  });
});
