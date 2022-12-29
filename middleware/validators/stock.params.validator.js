module.exports.params = async (ctx, next) => {
  await _checkIdCompany(ctx);
  await next();
};

async function _checkIdCompany(ctx) {
  const id_company = parseInt(ctx.request?.body?.id_company, 10);
  if (!id_company) {
    ctx.throw(400, 'incorrect id_company');
  }
  ctx.request.body.id_company = id_company;
}

module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(404, 'stock not found');
  }
  ctx.params.id = id;
  await next();
};
