const db = require('../libs/db');
const mapper = require('../mappers/stock.leftover');

module.exports.get = async (ctx) => {
  const leftover = await _getLeftover(ctx.params.id);
  if (!leftover) {
    ctx.throw(404, 'leftover not found');
  }
  ctx.status = 200;
  ctx.body = mapper(leftover);
};

module.exports.getAll = async (ctx) => {
  const leftovers = await _getAllLeftovers();
  ctx.status = 200;
  ctx.body = leftovers.map((leftover) => mapper(leftover));
};

module.exports.add = async (ctx) => {
  const leftover = await _addLeftover(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(leftover);
};

module.exports.update = async (ctx) => {
  const leftover = await _updateLeftover(ctx.params.id, ctx.request.body);
  if (!leftover) {
    ctx.throw(404, 'leftover not found');
  }
  ctx.status = 200;
  ctx.body = mapper(leftover);
};

module.exports.delete = async (ctx) => {
  const leftover = await _deleteLeftover(ctx.params.id);
  if (!leftover) {
    ctx.throw(404, 'leftover not found');
  }
  ctx.status = 200;
  ctx.body = mapper(leftover);
};

async function _getLeftover(id) {
  return db.query('SELECT * FROM leftovers WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllLeftovers() {
  return db.query('SELECT * FROM leftovers')
    .then((res) => res.rows);
}

async function _addLeftover({ id_stock, id_product }) {
  return db.query(`INSERT INTO leftovers 
    (id_stock, id_product) VALUES ($1, $2) 
    RETURNING *
    `, [id_stock, id_product])
    .then((res) => res.rows[0]);
}

async function _updateLeftover(id, { id_stock, id_product }) {
  return db.query(`UPDATE leftovers
    SET
    id_stock=$2,
    id_product=$3
    WHERE id=$1
    RETURNING *
    `, [id, id_stock, id_product])
    .then((res) => res.rows[0]);
}

async function _deleteLeftover(id) {
  return db.query(`DELETE FROM leftovers
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
