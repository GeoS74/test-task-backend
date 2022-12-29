const db = require('../libs/db');

(async (_) => {
  await db.query(`
    insert into companies (inn, title, address, tel) 
      values 
        ('7423013290', 'ООО ''Ромашка''', 'г. Челябинск', '+7 (123) 456-78-90'),
        ('7452047840', 'ООО ''Рога и копыта''', 'г. Москва', '+7 (800) 123-12-12')`);
  await db.query(`insert into stocks (id_company) values (1), (2)`);
  await db.query(`insert into products (title) values ('Порошок Tide'), ('Печенье'), ('Шоколад'), ('Ferrari')`);
  await db.query(`
    insert into leftovers (id_stock, id_product) 
      values 
        (1, 1), 
        (1, 2), 
        (1, 3), 
        (2, 3)`);
  await db.query(`insert into shops (title) values ('Магазин на Тверской'), ('ГУМ')`);
  await db.query(`insert into customers (name) values ('Иван Иваныч'), ('Алексей Фёдорович')`);
  await db.query(`
    insert into sales (id_customer, id_shop, id_company, id_product) 
      values 
        (1, 1, 1, 1),
        (1, 1, 1, 2),
        (2, 2, 2, 3),

        (1, 2, 1, 2),
        (2, 1, 1, 1)
        `);
  process.exit();
})();