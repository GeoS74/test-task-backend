const db = require('../libs/db');
const mapper = require('../mappers/company.mapper');

module.exports.get = async (ctx) => {
  const company = await _getCompany(ctx.params.id);
  if (!company) {
    ctx.throw(404, 'company not found');
  }
  ctx.status = 200;
  ctx.body = mapper(company);
};

module.exports.getAll = async (ctx) => {
  const companies = await _getAllCompanies();
  ctx.status = 200;
  ctx.body = companies.map((company) => mapper(company));
};

module.exports.add = async (ctx) => {
  const company = await _addCompany(ctx.request.body);
  ctx.status = 201;
  ctx.body = mapper(company);
};

module.exports.update = async (ctx) => {
  const company = await _updateCompany(ctx.params.id, ctx.request.body);
  if (!company) {
    ctx.throw(404, 'company not found');
  }
  ctx.status = 200;
  ctx.body = mapper(company);
};

module.exports.delete = async (ctx) => {
  const company = await _deleteCompany(ctx.params.id);
  if (!company) {
    ctx.throw(404, 'company not found');
  }
  ctx.status = 200;
  ctx.body = mapper(company);
};

async function _getCompany(id) {
  return db.query('SELECT * FROM companies WHERE id=$1', [id])
    .then((res) => res.rows[0]);
}

async function _getAllCompanies() {
  return db.query('SELECT * FROM companies')
    .then((res) => res.rows);
}

async function _addCompany({
  title, inn, address, tel,
}) {
  return db.query(`INSERT INTO companies 
    (inn, title, address, tel) VALUES ($1, $2, $3, $4) 
    RETURNING *
    `, [inn, title, address, tel])
    .then((res) => res.rows[0]);
}

async function _updateCompany(id, {
  title, inn, address, tel,
}) {
  return db.query(`UPDATE companies
    SET
      inn=$2,
      title=$3,
      address=$4,
      tel=$5
    WHERE id=$1
    RETURNING *
    `, [id, inn, title, address, tel])
    .then((res) => res.rows[0]);
}

async function _deleteCompany(id) {
  return db.query(`DELETE FROM companies
    WHERE id=$1
    RETURNING *
    `, [id])
    .then((res) => res.rows[0]);
}
