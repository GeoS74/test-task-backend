module.exports.params = async (ctx, next) => {
  await _checkIdCustomer(ctx);
  await _checkIdShop(ctx);
  await _checkIdCompany(ctx);
  await _checkIdProduct(ctx);
  await next();
};

async function _checkIdCustomer(ctx) {
  const id_customer = parseInt(ctx.request?.body?.id_customer, 10);
  if (!id_customer) {
    ctx.throw(400, 'incorrect id_customer');
  }
  ctx.request.body.id_customer = id_customer;
}

async function _checkIdShop(ctx) {
  const id_shop = parseInt(ctx.request?.body?.id_shop, 10);
  if (!id_shop) {
    ctx.throw(400, 'incorrect id_shop');
  }
  ctx.request.body.id_shop = id_shop;
}

async function _checkIdCompany(ctx) {
  const id_company = parseInt(ctx.request?.body?.id_company, 10);
  if (!id_company) {
    ctx.throw(400, 'incorrect id_company');
  }
  ctx.request.body.id_company = id_company;
}

async function _checkIdProduct(ctx) {
  const id_product = parseInt(ctx.request?.body?.id_product, 10);
  if (!id_product) {
    ctx.throw(400, 'incorrect id_product');
  }
  ctx.request.body.id_company = id_product;
}

module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(404, 'sale not found');
  }
  ctx.params.id = id;
  await next();
};
