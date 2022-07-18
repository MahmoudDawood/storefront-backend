CREATE TABLE order_products (
  quantity INTEGER NOT NULL,
  order_id BIGINT REFERENCES orders(id),
  product_id BIGINT REFERENCES  products(id),
  PRIMARY KEY (order_id, product_id)
);