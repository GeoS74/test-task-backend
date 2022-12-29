module.exports.params = async (ctx, next) => {
  await _checkIdStock(ctx);
  await _checkIdProduct(ctx);
  await next();
};

async function _checkIdProduct(ctx) {
  const id_product = parseInt(ctx.request?.body?.id_product, 10);
  if (!id_product) {
    ctx.throw(400, 'incorrect id_product');
  }
  ctx.request.body.id_product = id_product;
}

async function _checkIdStock(ctx) {
  const id_stock = parseInt(ctx.request?.body?.id_stock, 10);
  if (!id_stock) {
    ctx.throw(400, 'incorrect id_stock');
  }
  ctx.request.body.id_stock = id_stock;
}

module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(404, 'leftover not found');
  }
  ctx.params.id = id;
  await next();
};
