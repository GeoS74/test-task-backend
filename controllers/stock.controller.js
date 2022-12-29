const db = require('../libs/db');
const mapper = require('../mappers/stock.mapper');

module.exports.get = async (ctx) => {
  const stock = await _getStock(ctx.params.id);
  if (!stock) {
    ctx.throw(404, 'stock not found');
  }
  ctx.status = 200;
  ctx.body = mapper(stock);
};

module.exports.getAll = async (ctx) => {
  const stocks = await _getAllStocks();
  ctx.status = 200;
  ctx.body = stocks.map((stock) => mapper(stock));
};

module.exports.add = async (ctx) => {
  const stock = await _addStock(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(stock);
};

module.exports.update = async (ctx) => {
  const stock = await _updateStock(ctx.params.id, ctx.request.body);
  if (!stock) {
    ctx.throw(404, 'stock not found');
  }
  ctx.status = 200;
  ctx.body = mapper(stock);
};

module.exports.delete = async (ctx) => {
  const stock = await _deleteStock(ctx.params.id);
  if (!stock) {
    ctx.throw(404, 'stock not found');
  }
  ctx.status = 200;
  ctx.body = mapper(stock);
};

async function _getStock(id) {
  return db.query('SELECT * FROM stocks WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllStocks() {
  return db.query('SELECT * FROM stocks')
    .then((res) => res.rows);
}

async function _addStock({ id_company }) {
  return db.query(`INSERT INTO stocks 
    (id_company) VALUES ($1) 
    RETURNING *
    `, [id_company])
    .then((res) => res.rows[0]);
}

async function _updateStock(id, { id_company }) {
  return db.query(`UPDATE stocks
    SET
    id_company=$2
    WHERE id=$1
    RETURNING *
    `, [id, id_company])
    .then((res) => res.rows[0]);
}

async function _deleteStock(id) {
  return db.query(`DELETE FROM stocks
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
