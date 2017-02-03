'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _documentController = require('./controllers/documentController');

var _documentController2 = _interopRequireDefault(_documentController);

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _roleController = require('./controllers/roleController');

var _roleController2 = _interopRequireDefault(_roleController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// setup the app
var app = express();
var router = express.Router();
var port = parseInt(process.env.PORT, 10) || 8000;
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//************************//
//-----Controllers--------//
//************************//


//************************//
//-----Routes-------------//
//************************//

//=========================//            //
//== Roles Routes        ==//============//
//=========================//            //
app.post('/roles', _roleController2.default.createRole);
app.get('/roles', _roleController2.default.fetchRoles);
app.delete('/roles/:id', _roleController2.default.deleteRole);

//=========================//            //
//==    User Routes      ==//============//
//=========================//            //
app.post('/user', _userController2.default.createUser);
app.get('/user/:id', _userController2.default.fetchUser);
app.get('/users', _userController2.default.fetchAllUsers);
app.delete('/users/:id', _userController2.default.deleteUser);
app.put('/users/:id', _userController2.default.updateUser);

//=========================//            //
//== Document Routes     ==//============//
//=========================//            //
app.post('/document', _documentController2.default.createDocument);
app.get('/document', _documentController2.default.fetchDocument);

//=========================//            //
//==    Catch All Route  ==//============//
//=========================//            //
app.get('*', function (req, res) {
  res.status(200).send({
    "message": "welcome"
  });
});

app.listen(port, function () {
  console.log('App running on port ', port);
});
exports.default = app;