module.exports.params = async (ctx, next) => {
  await _checkINN(ctx);
  await _checkTitle(ctx);
  await next();
};

async function _checkINN(ctx) {
  const inn = ctx.request?.body?.inn?.trim();
  if (!inn) {
    ctx.throw(400, 'incorrect inn');
  }
  ctx.request.body.inn = inn;
}

async function _checkTitle(ctx) {
  const title = ctx.request?.body?.title?.trim();
  if (!title) {
    ctx.throw(400, 'incorrect title');
  }
  ctx.request.body.title = title;
}

module.exports.id = async (ctx, next) => {
  const id = parseInt(ctx.params.id, 10);
  if (!id) {
    ctx.throw(404, 'company not found');
  }
  ctx.params.id = id;
  await next();
};
