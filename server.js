const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the app
var app = express();
var router = express.Router();
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


  //************************//
 //-----Controllers--------//
//************************//
const documentController = require('./server/app/controllers/').documents;
const userController = require('./server/app/controllers/').users;



  //************************//
 //-----Routes-------------//
//************************//

  //=========================//            //
 //==    User Routes      ==//============//
//=========================//            //
app.post('/user', userController.create);
app.get('/user', userController.index);

  //=========================//            //
 //== Document Routes     ==//============//
//=========================//            //
app.post('/document', documentController.create);
app.get('/document', documentController.index);



  //=========================//            //
 //==    Catch All Route  ==//============//
//=========================//            //
app.get('*', (req,res) => {
    res.status(200).send({
        "message": "welcome"
    });
});

module.exports = app;
