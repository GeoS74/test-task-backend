CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  inn TEXT UNIQUE NOT NULL,
  address TEXT,
  tel TEXT,
  title TEXT
);
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL
);
CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  id_company INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE
);
CREATE TABLE leftovers (
  id SERIAL PRIMARY KEY,
  id_stock INTEGER NOT NULL REFERENCES stocks ON DELETE CASCADE,
  id_product INTEGER NOT NULL REFERENCES products ON DELETE CASCADE
);
CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL
);
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  id_customer INTEGER NOT NULL REFERENCES customers ON DELETE CASCADE,
  id_shop INTEGER NOT NULL REFERENCES shops ON DELETE CASCADE,
  id_company INTEGER NOT NULL REFERENCES companies ON DELETE CASCADE,
  id_product INTEGER NOT NULL REFERENCES products ON DELETE CASCADE
);
INSERT INTO companies (inn, title, address, tel) 
  VALUES 
    ('7423013290', 'ООО Ромашка', 'г. Челябинск', '+7 (123) 456-78-90'),
    ('7452047840', 'ООО Рога и копыта', 'г. Москва', '+7 (800) 123-12-12');
INSERT INTO stocks (id_company) VALUES (1), (2);
INSERT INTO products (title) VALUES ('Порошок Tide'), ('Печенье'), ('Шоколад'), ('Ferrari');
INSERT INTO leftovers (id_stock, id_product) 
  VALUES 
    (1, 1), 
    (1, 2), 
    (1, 3), 
    (2, 3);
INSERT INTO shops (title) VALUES ('Магазин на Тверской'), ('ГУМ');
INSERT INTO customers (name) VALUES ('Иван Иваныч'), ('Алексей Фёдорович');
INSERT INTO sales (id_customer, id_shop, id_company, id_product) 
  VALUES 
    (1, 1, 1, 1),
    (1, 1, 1, 2),
    (2, 2, 2, 3),
    (1, 2, 1, 2),
    (2, 1, 1, 1);