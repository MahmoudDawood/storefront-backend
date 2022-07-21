import { User, UserStore } from '../../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();
const testUser = {
  firstName: 'test',
  lastName: 'user',
  username: 'testuser',
  password: 'password'
};
const firstUser = {
  id: 1,
  firstName: 'test',
  lastName: 'user',
  username: 'testuser',
  password: 'password'
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
    expect(users.length).toBe(1);
    // const [firstName, lastName, userName, password] = Object.values(users[0]);
    // expect([firstName, lastName, userName, password]).toEqual(
    //   Object.values(firstUser)
    // );
  });
  it('Should create a user (create)', async () => {
    const user = await store.create(testUser);
    const [id, firstName, lastName, username, password] = Object.values(user);
    expect([firstName, lastName, username]).toEqual(
      Object.values(firstUser).slice(1, 4)
    );
    expect(id).toBe(2);
    expect(
      bcrypt.compareSync(firstUser.password + pepper, password as string)
    ).toBeTruthy();
  });
  it('Should show created user by id', async () => {
    const user = await store.show(1);
    const [id, firstName, lastName, username, password] = Object.values(user);
    expect([id, firstName, lastName, username]).toEqual(
      Object.values(firstUser).slice(0, 4)
    );
    expect(
      bcrypt.compareSync(firstUser.password + pepper, password as string)
    ).toBeTruthy();
  });
  it('Should list all users2 (index)', async () => {
    const users = await store.index();
    expect(users.length).toBe(2);
    const [id, firstName, lastName, username, password] = Object.values(
      users[0]
    );
    expect([id, firstName, lastName, username]).toEqual(
      Object.values(firstUser).slice(0, 4)
    );
    expect(
      bcrypt.compareSync(firstUser.password + pepper, password as string)
    ).toBeTruthy();
  });
  it('Should autheticate saved user', async () => {
    const user = await store.authenticate(testUser.username, testUser.password);
    const [id, firstName, lastName, username, password] = Object.values(
      user as User
    );
    expect([id, firstName, lastName, username]).toEqual(
      Object.values(firstUser).slice(0, 4)
    );
    expect(
      bcrypt.compareSync(firstUser.password + pepper, password as string)
    ).toBeTruthy();
  });
  it('Should refuse to autheticate fake user', async () => {
    const user = await store.authenticate(testUser.username, 'fakePassword');
    expect(user).toBeNull();
  });
  // it('Should delete user', async () => {
  //   const user = await store.delete(firstUser.id);
  //   const [id, firstName, lastName, username, password] = Object.values(user);
  //   expect([id, firstName, lastName, username]).toEqual(
  //     Object.values(firstUser).slice(0, 4)
  //   );
  //   expect(
  //     bcrypt.compareSync(firstUser.password + pepper, password as string)
  //   ).toBeTruthy();
  // });
  // it('Should list all users3 (index)', async () => {
  //   const users = await store.index();
  //   expect(users.length).toBe(0);
  //   expect(users).toEqual([]);
  // });
});
