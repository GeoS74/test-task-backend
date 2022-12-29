const db = require('../libs/db');
const mapper = require('../mappers/product.mapper');

module.exports.get = async (ctx) => {
  const product = await _getProduct(ctx.params.id);
  if (!product) {
    ctx.throw(404, 'product not found');
  }
  ctx.status = 200;
  ctx.body = mapper(product);
};

module.exports.getAll = async (ctx) => {
  const products = await _getAllProducts();
  ctx.status = 200;
  ctx.body = products.map((product) => mapper(product));
};

module.exports.add = async (ctx) => {
  const product = await _addProduct(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(product);
};

module.exports.update = async (ctx) => {
  const product = await _updateProduct(ctx.params.id, ctx.request.body);
  if (!product) {
    ctx.throw(404, 'product not found');
  }
  ctx.status = 200;
  ctx.body = mapper(product);
};

module.exports.delete = async (ctx) => {
  const product = await _deleteProduct(ctx.params.id);
  if (!product) {
    ctx.throw(404, 'product not found');
  }
  ctx.status = 200;
  ctx.body = mapper(product);
};

async function _getProduct(id) {
  return db.query('SELECT * FROM products WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllProducts() {
  return db.query('SELECT * FROM products')
    .then((res) => res.rows);
}

async function _addProduct({ title }) {
  return db.query(`INSERT INTO products 
    (title) VALUES ($1) 
    RETURNING *
    `, [title])
    .then((res) => res.rows[0]);
}

async function _updateProduct(id, { title }) {
  return db.query(`UPDATE products
    SET
    title=$2
    WHERE id=$1
    RETURNING *
    `, [id, title])
    .then((res) => res.rows[0]);
}

async function _deleteProduct(id) {
  return db.query(`DELETE FROM products
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
