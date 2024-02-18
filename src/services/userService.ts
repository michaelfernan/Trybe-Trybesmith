import { User } from '../types/User'; 
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

type UserAndProducts = User & {
  productIds: { id: number }[];
};

type UserWithProducts = {
  username: string;
  productIds: number[];
};

async function getAllUsersWithProducts(): Promise<UserWithProducts[]> {
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds', 
      attributes: ['id'],
    }],
    attributes: ['username'],
  });

  return users.map((user) => {
    const userWithProducts = user.get({ plain: true }) as UserAndProducts;
    return {
      username: userWithProducts.username,
      productIds: userWithProducts.productIds.map((product: { id: number }) => product.id),
    };
  });
}

export default getAllUsersWithProducts;
