const db = require('../libs/db');
const mapper = require('../mappers/sale.mapper');

module.exports.get = async (ctx) => {
  const sale = await _getSale(ctx.params.id);
  if (!sale) {
    ctx.throw(404, 'sale not found');
  }
  ctx.status = 200;
  ctx.body = mapper(sale);
};

module.exports.getAll = async (ctx) => {
  const sales = await _getAllSales();
  ctx.status = 200;
  ctx.body = sales.map((sale) => mapper(sale));
};

module.exports.add = async (ctx) => {
  const sale = await _addSale(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(sale);
};

module.exports.update = async (ctx) => {
  const sale = await _updateSale(ctx.params.id, ctx.request.body);
  if (!sale) {
    ctx.throw(404, 'sale not found');
  }
  ctx.status = 200;
  ctx.body = mapper(sale);
};

module.exports.delete = async (ctx) => {
  const sale = await _deleteSale(ctx.params.id);
  if (!sale) {
    ctx.throw(404, 'sale not found');
  }
  ctx.status = 200;
  ctx.body = mapper(sale);
};

async function _getSale(id) {
  return db.query('SELECT * FROM sales WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllSales() {
  return db.query('SELECT * FROM sales')
    .then((res) => res.rows);
}

async function _addSale({
  id_customer, id_shop, id_company, id_product,
}) {
  return db.query(`INSERT INTO sales 
    (id_customer, id_shop, id_company, id_product) VALUES ($1, $2, $3, $4) 
    RETURNING *
    `, [id_customer, id_shop, id_company, id_product])
    .then((res) => res.rows[0]);
}

async function _updateSale(id, {
  id_customer, id_shop, id_company, id_product,
}) {
  return db.query(`UPDATE sales
    SET
      id_customer=$2,
      id_shop=$3,
      id_company=$4,
      id_product=$5
    WHERE id=$1
    RETURNING *
    `, [id, id_customer, id_shop, id_company, id_product])
    .then((res) => res.rows[0]);
}

async function _deleteSale(id) {
  return db.query(`DELETE FROM sales
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
