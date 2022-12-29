const db = require('../libs/db');
const mapper = require('../mappers/customer.mapper');

module.exports.get = async (ctx) => {
  const customer = await _getCustomer(ctx.params.id);
  if (!customer) {
    ctx.throw(404, 'customer not found');
  }
  ctx.status = 200;
  ctx.body = mapper(customer);
};

module.exports.getAll = async (ctx) => {
  const customers = await _getAllCustomers();
  ctx.status = 200;
  ctx.body = customers.map((customer) => mapper(customer));
};

module.exports.add = async (ctx) => {
  const customer = await _addCustomer(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(customer);
};

module.exports.update = async (ctx) => {
  const customer = await _updateCustomer(ctx.params.id, ctx.request.body);
  if (!customer) {
    ctx.throw(404, 'customer not found');
  }
  ctx.status = 200;
  ctx.body = mapper(customer);
};

module.exports.delete = async (ctx) => {
  const customer = await _deleteCustomer(ctx.params.id);
  if (!customer) {
    ctx.throw(404, 'customer not found');
  }
  ctx.status = 200;
  ctx.body = mapper(customer);
};

async function _getCustomer(id) {
  return db.query('SELECT * FROM customers WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllCustomers() {
  return db.query('SELECT * FROM customers')
    .then((res) => res.rows);
}

async function _addCustomer({ name }) {
  return db.query(`INSERT INTO customers 
    (name) VALUES ($1) 
    RETURNING *
    `, [name])
    .then((res) => res.rows[0]);
}

async function _updateCustomer(id, { name }) {
  return db.query(`UPDATE customers
    SET
    name=$2
    WHERE id=$1
    RETURNING *
    `, [id, name])
    .then((res) => res.rows[0]);
}

async function _deleteCustomer(id) {
  return db.query(`DELETE FROM customers
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
