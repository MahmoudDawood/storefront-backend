# API Requirements

The company stakeholders wanted to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. I have been tasked with building the API that will support this application, and my coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- AN INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- A SHOW products in orders route: '/products-in-orders' [GET]
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

| Name              | Type                  |
| ----------------- | --------------------- |
| id (pk)           | SERIAL                |
| name (string)     | VARCHAR(255) NOT NULL |
| price (number)    | INT                   |
| category (string) | VARCHAR(50)           |

#### Users

| Name               | Type                  |
| ------------------ | --------------------- |
| id (pk)            | SERIAL                |
| firstName (string) | VARCHAR(20)           |
| lastName (number)  | VARCHAR(20)           |
| username (string)  | VARCHAR(50) NOT NULL  |
| password (string)  | VARCHAR(255) NOT NULL |

#### Orders

| Name            | Type         | References |
| --------------- | ------------ | ---------- |
| id (pk)         | SERIAL       |            |
| status (string) | VARCHAR(100) |            |
| user_id (fk)    | BIGINT       | users (id) |

#### Order_products

| Name                        | Type             | References    |
| --------------------------- | ---------------- | ------------- |
| (order_id, product_id) (pk) | COMPOSITE        |               |
| quantity (number)           | INTEGER NOT NULL |               |
| order_id (fk)               | BIGINT           | orders (id)   |
| product_id (fk)             | BIGINT           | products (id) |
