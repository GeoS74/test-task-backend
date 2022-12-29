const Koa = require('koa');
const cors = require('@koa/cors');

const errorCatcher = require('./middleware/error.catcher');
const testQueryRoutes = require('./routes/queries.routes');
const companyRoutes = require('./routes/company.routes');
const stockRoutes = require('./routes/stock.routes');
const leftoverRoutes = require('./routes/leftover.routes');
const productRoutes = require('./routes/product.routes');
const shopRoutes = require('./routes/shop.routes');
const customerRoutes = require('./routes/customer.routes');
const saleRoutes = require('./routes/sale.routes');

const app = new Koa();

app.use(cors());
app.use(errorCatcher);

app.use(testQueryRoutes);
app.use(companyRoutes);
app.use(stockRoutes);
app.use(leftoverRoutes);
app.use(productRoutes);
app.use(shopRoutes);
app.use(customerRoutes);
app.use(saleRoutes);

module.exports = app;
