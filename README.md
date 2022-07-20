# Storefront Backend Project

------------- Add database relations figma image here ---------------

- A storefront backend that's capable of:

  - Creating products, orders and users
  - linking order to users
  - Assigning products to orders
  - Showing specific table rows
  - Showing custom relations between tables
  - Authenticating users
  - Testing it's models (unit testing) and routes (integration testing)

- ## **For more info about the project, RESTful routes, database schema visit <a>REQUIREMENTS.md</a>**

### Tech used: TypeScript, Express, Node.js, PostgreSQL, Jasmine<br>

## Project setup steps

- ## **Create .env file with the following keys & fill empty field with your preference:**

  PG_HOST=127.0.0.1
  PG_DATABASE=store_front
  PG_DATABASE_TEST=store_front_test
  PG_USER=
  PG_PASSWORD=
  ENV=dev
  BCRYPT_PASSWORD=
  SALT_ROUNDS=
  TOKEN_SECRET=

- ## **Create database (store_front) & (store_front_test) for testing**

- ## **Important Scripts:**

  - Packages installation: `npm install`
  - Build: `npm run build`
  - Test models & routes: `npm run test`
  - Watch server: `npm run watch`
  - Start: `npm run start`

- **Ports:**
  - Development Server is running on port `3000`
  - Testing server is running on port `4000`

## Optimizations

- **Backlog:**
  - Integrate with the front-end to present project functionality to users.
  - Add method to progerss order status steps from 'pending' to 'shipped'.
  - Require user info on order creation.
  - Add checkout functionality to submit order for shipping.
  - Include database table to organize orders ready for shipping and start checking them.
  - Authorize user to allow accessing progressing orders and edit them.

## Lessons Learned:

**By failing to prepare, you're preparing to fail.**
Gathering requirements and planning could be more important than developing the product, which was true to me in this project.
Returning to the big picture from time to time and aligning current task with our main objective is very important to visualize the process in our mind. It was mentioned before in learning how to learn course. After learning this concept, this project was my first actual proof of it.
Learning the concept is more important than knowing the syntax, I knew this before but, I experienced it now.

---

<!-- ## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission! -->
