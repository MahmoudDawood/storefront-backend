import { UserStore } from '../../Models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

const store = new UserStore();
const testUser = {
  firstName: 'first',
  lastName: 'last',
  password: 'password'
};
const dbUser = {
  firstname: 'first',
  lastname: 'last',
  password: bcrypt.hashSync('password' + pepper, parseInt(saltRounds as string))
};

const firstUser = {
  id: 1,
  firstName: 'first',
  lastName: 'last',
  password: bcrypt.hashSync('password' + pepper, parseInt(saltRounds as string))
};

describe('Tests users model:', () => {
  it('Should have index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have create method', () => {
    expect(store.create).toBeDefined();
  });
  it('Should have show method', () => {
    expect(store.show).toBeDefined();
  });
  it('Should list all users (index)', async () => {
    const users = await store.index();
    expect(users.length).toBe(0);
    expect(users).toEqual([]);
  });
  it('Should create a user (create)', async () => {
    const user = await store.create(testUser);
    // expect(user).toEqual({
    //   firstname: 'first',
    //   lastname: 'last',

    // })
    // console.log(user);
    // expect(user.firstName).toBe('first');
    // expect(user.lastName).toBe('last');
    expect(
      bcrypt.compareSync('password' + pepper, firstUser.password)
    ).toBeTruthy();
  });
  it('Should show created user by id', async () => {
    const user = await store.show(1);
    expect(user).toEqual(firstUser);
  });
  it('Should list all users2 (index)', async () => {
    const users = await store.index();
    expect(users.length).toBe(1);
    expect(users).toEqual([firstUser]);
  });
});
