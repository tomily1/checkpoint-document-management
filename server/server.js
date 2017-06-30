/* eslint-disable no-console */
import IndexRoute from './routes/index';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the app
const app = express();
const port = parseInt(process.env.PORT, 10) || 2000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, x-access-token');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -----Routes-------------//

IndexRoute.Roles(app);
IndexRoute.Users(app);
IndexRoute.Documents(app);
IndexRoute.Index(app);
app.listen(port, () => {
  console.log('\nApp running on port ', port);
});
export default app;
