import { User } from '../../src/types/user';

export const mockedUser1: User = {
  id: 1,
  username: 'user1',
  vocation: 'developer',
  level: 5,
  password: 'password1',
  productIds: [1, 2], 
};

export const mockedUser2: User = {
  id: 2,
  username: 'user2',
  vocation: 'designer',
  level: 3,
  password: 'password2',
  productIds: [3], 
};

export const mockedUser3: User = {
  id: 3,
  username: 'user3',
  vocation: 'manager',
  level: 7,
  password: 'password3',
  productIds: [2],
};

export const mockedUser4: User = {
  id: 4,
  username: 'user4',
  vocation: 'tester',
  level: 2,
  password: 'password4',
  productIds: [4, 5],
};

export const mockedUser5: User = {
  id: 5,
  username: 'user5',
  vocation: 'analyst',
  level: 6,
  password: 'password5',
  productIds: [6],
};
