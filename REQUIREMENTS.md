# API Requirements

The company stakeholders wanted to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I have been tasked with building the API that will support this application, and my coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- AN INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- A SHOW products in orders route: '/products-in-order' [GET]
- A SHOW by category route: '/products/?category' [GET]
- A SHOW five most expensive route: '/five-most-expensive-products' [GET]
- A SHOW five most popular route: '/five-most-popular-products' [GET]
- A CREATE route: '/products' [POST] (Authentication required)

#### Users

- AN INDEX route: '/users' [GET] (Authentication required)
- AN INDEX for users with orders route: '/users-with-orders' [GET] (Authentication required)
- A SHOW route: '/users/:id' [GET] (Authentication required)
- A CREATE route: '/users' [POST]

#### Orders

- AN INDEX route: '/orders' [GET]
- A SHOW orders by user route: '/orders/:id' [GET]
- A SHOW completed orders by user route: '/user-completed-orders/:id' [GET]
- A CREATE route: '/orders' [POST]
- A CREATE product in order route: '/orders/:id/products' [POST]

## Data Schema

#### Products

| id (pk) |     name (string)     | price (number) | category (string) |
| :-----: | :-------------------: | :------------: | :---------------: |
|         | VARCHAR(255) NOT NULL |    INTEGER     |    VARCHAR(50)    |

#### Users

| id (pk) | firstName (string) | lastName (number) |  username (string)   |   password (string)   |
| :-----: | :----------------: | :---------------: | :------------------: | :-------------------: |
|         |    VARCHAR(20)     |    VARCHAR(20)    | VARCHAR(50) NOT NULL | VARCHAR(255) NOT NULL |

#### Orders

| id(pk) | status(string) |    user_id(fk)    |
| :----: | :------------: | :---------------: |
|        |  VARCHAR(100)  | BIGINT users (id) |

#### Order_products

| (order_id, product_id)(pk) | quantity(number) |    order_id(fk)    |   product_id(fk)    |
| :------------------------: | :--------------: | :----------------: | :-----------------: |
|                            | INTEGER NOT NULL | BIGINT orders (id) | BIGINT product (id) |

---

<!-- ## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete) -->
