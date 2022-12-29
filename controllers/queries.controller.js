const db = require('../libs/db');

module.exports.get = async (ctx) => {
  let result;
  switch (ctx.query.action) {
    case 'getCustomersByProduct':
      result = await getCustomersByProduct();
      break;
    case 'getCustomersSalesFirstComp':
      result = await getCustomersSalesFirstComp();
      break;
    case 'getProductNotSales':
      result = await getProductNotSales();
      break;
    case 'getLeftoversFirstComp':
      result = await getLeftoversFirstComp();
      break;
    case 'getCompany':
      result = await getCompany();
      break;
    case 'getCustomers':
      result = await getCustomers();
      break;
    case 'getProducts':
      result = await getProducts();
      break;
    case 'getShops':
      result = await getShops();
      break;
    case 'getLeftovers':
      result = await getLeftovers();
      break;
    default:
      ctx.throw(400, 'unknown query');
      return;
  }
  ctx.status = 200;
  ctx.body = result;
};

async function getCustomersByProduct() {
  return db.query(`
    select 
      C.name, P.title 
    from products as P 
    join sales as S 
      on P.id=S.id_product 
    join customers as C 
      on S.id_customer=C.id 
    where P.title='Печенье'
    group by C.name, P.title;
  `)
    .then((res) => res.rows);
}

async function getCustomersSalesFirstComp() {
  return db.query(`
  select distinct C.id, C.name
  from customers as C
  join sales as S
    on C.id=S.id_customer 
    and S.id_customer not in (
      select s1.id_customer
      from sales s1
      where s1.id_company = 2
    );
  `)
    .then((res) => res.rows);
}

async function getProductNotSales() {
  return db.query(`
  select P.title
  from products as P
  left join sales as S
    on P.id=S.id_product
  where S.id_product is null;
  `)
    .then((res) => res.rows);
}

async function getLeftoversFirstComp() {
  return db.query(`
  select distinct P.id, P.title, C.title
  from products as P
  join leftovers as L
    on P.id=L.id_product
    and L.id_product not in (
      select l1.id_product
      from leftovers l1
      join stocks s1
      on l1.id_stock=s1.id
      where s1.id_company=2
    )
  join stocks S
    on S.id=L.id_stock
  join companies C
    on C.id=S.id_company;
  `)
    .then((res) => res.rows);
}

// дополнительные запросы
async function getCompany() {
  return db.query(`
  select * from companies
  `)
    .then((res) => res.rows);
}

async function getCustomers() {
  return db.query(`
  select * from customers
  `)
    .then((res) => res.rows);
}

async function getProducts() {
  return db.query(`
  select * from products
  `)
    .then((res) => res.rows);
}

async function getShops() {
  return db.query(`
  select * from shops
  `)
    .then((res) => res.rows);
}

async function getLeftovers() {
  return db.query(`
  select 
    p1.title as product, 
    c1.inn, 
    c1.title as company
  from leftovers l1
  join stocks s1
    on l1.id_stock=s1.id
  join companies c1
    on s1.id_company=c1.id
  join products p1
    on p1.id=l1.id_product
  `)
    .then((res) => res.rows);
}
