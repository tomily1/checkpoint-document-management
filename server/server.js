/* eslint-disable no-console */
import IndexRoute from './routes/index';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the app
const app = express();
const port = parseInt(process.env.PORT, 10) || 2000;
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -----Routes-------------//
IndexRoute.Roles(app);
IndexRoute.Users(app);
IndexRoute.Documents(app);
// app.get('/users/:id/documents', DocumentController.fetchUserDocument);
IndexRoute.Index(app);
app.listen(port, () => {
  console.log('\nApp running on port ', port);
});
export default app;
