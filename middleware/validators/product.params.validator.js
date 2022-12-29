module.exports.params = async (ctx, next) => {
  await next();
};

module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(404, 'product not found');
  }
  ctx.params.id = id;
  await next();
};
