# Storefront Backend Project

![Database schema](https://user-images.githubusercontent.com/30799773/181291004-ae5feb72-5405-4575-896d-716891110ba6.png)

## A storefront backend that's capable of:

- Creating products, orders and users
- linking order to users
- Assigning products to orders
- Showing specific table rows
- Showing custom relations between tables
- Authenticating users
- Testing its models (unit testing) and routes (integration testing)

### For more info about the project, RESTful routes, database schema visit [REQUIREMENTS.md](REQUIREMENTS.md)

### Tech used: TypeScript, Express, Node.js, PostgreSQL, Jasmine.<br>

## Project setup steps:

- ### Configure database

  - Create user: `CREATE USER store_user WITH PASSWORD 'chosenPassword123';`<br>
  - Create database: `CREATE DATABASE store_front;`
  - Create test database: `CREATE DATABASE store_front_test;`
  - Grant all privilages to user in both databases:<br>
    `GRANT ALL PRIVILAGES ON DATABASE store_front TO store_user;`<br>
    `GRANT ALL PRIVILAGES ON DATABASE store_front_test TO store_user;`<br>

- ### Create .env file with the following keys & fill your preference:

  - PG_HOST=127.0.0.1<br>
  - PG_DATABASE=store_front<br>
  - PG_DATABASE_TEST=store_front_test<br>
  - PG_USER=store_user<br>
  - PG_PASSWORD=chosePassword123<br>
  - ENV=dev<br>
  - BCRYPT_PASSWORD=[[Pepper-preference]]<br>
  - SALT_ROUNDS=[[Hashing-rounds-preference]]<br>
  - TOKEN_SECRET=[[Secret-signature-preference]]<br>

- ### **Ports:**

  - Database port: `5432`
  - Development Server port: `3000`
  - Testing server port: `4000`

- ## **Important Scripts:**

  - Packages installation: `npm install`
  - Build: `npm run build`
  - Test models & routes: `npm run test`
  - Watch server: `npm run watch`
  - Start: `npm run start`

---

## Optimizations

### Backlog:

- Integrate with the front-end to present project functionality to users.
- Add method to progerss order status steps from 'pending' to 'shipped'.
- Require user info on order creation.
- Add checkout functionality to submit order for shipping.
- Include database table to organize orders ready for shipping and start checking them.
- Authorize user to allow accessing progressing orders and edit them.

## Lessons Learned:

**By failing to prepare, you're preparing to fail.**<br>

1. Gathering requirements and planning could be more important than developing the product, which was true to me in this project.<br>
2. Returning to the big picture from time to time and aligning current task with our main objective is very important to visualize the process in our mind. It was mentioned before in learning how to learn course. After learning this concept, this project was my first actual proof of it.<br>
3. Learning the concept is more important than knowing the syntax, I knew this before but, I experienced it here.
