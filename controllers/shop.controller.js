const db = require('../libs/db');
const mapper = require('../mappers/shop.mapper');

module.exports.get = async (ctx) => {
  const shop = await _getShop(ctx.params.id);
  if (!shop) {
    ctx.throw(404, 'shop not found');
  }
  ctx.status = 200;
  ctx.body = mapper(shop);
};

module.exports.getAll = async (ctx) => {
  const shops = await _getAllShops();
  ctx.status = 200;
  ctx.body = shops.map((shop) => mapper(shop));
};

module.exports.add = async (ctx) => {
  const shop = await _addShop(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(shop);
};

module.exports.update = async (ctx) => {
  const shop = await _updateShop(ctx.params.id, ctx.request.body);
  if (!shop) {
    ctx.throw(404, 'shop not found');
  }
  ctx.status = 200;
  ctx.body = mapper(shop);
};

module.exports.delete = async (ctx) => {
  const shop = await _deleteShop(ctx.params.id);
  if (!shop) {
    ctx.throw(404, 'shop not found');
  }
  ctx.status = 200;
  ctx.body = mapper(shop);
};

async function _getShop(id) {
  return db.query('SELECT * FROM shops WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllShops() {
  return db.query('SELECT * FROM shops')
    .then((res) => res.rows);
}

async function _addShop({ title }) {
  return db.query(`INSERT INTO shops 
    (title) VALUES ($1) 
    RETURNING *
    `, [title])
    .then((res) => res.rows[0]);
}

async function _updateShop(id, { title }) {
  return db.query(`UPDATE shops
    SET
    title=$2
    WHERE id=$1
    RETURNING *
    `, [id, title])
    .then((res) => res.rows[0]);
}

async function _deleteShop(id) {
  return db.query(`DELETE FROM shops
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
