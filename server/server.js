const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup the app
const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


  //************************//
 //-----Controllers--------//
//************************//
import DocumentController from './controllers/documentController';
import UserController from './controllers/userController';
import RoleController from './controllers/roleController';



  //************************//
 //-----Routes-------------//
//************************//

  //=========================//            //
 //== Roles Routes        ==//============//
//=========================//            //
app.post('/roles', RoleController.createRole);
app.get('/roles', RoleController.fetchRoles);
app.delete('/roles/:id', RoleController.deleteRole);

  //=========================//            //
 //==    User Routes      ==//============//
//=========================//            //
app.post('/user', UserController.createUser);
app.get('/user/:id', UserController.fetchUser);
app.get('/users', UserController.fetchAllUsers);
app.delete('/users/:id', UserController.deleteUser);
app.put('/users/:id', UserController.updateUser);

  //=========================//            //
 //== Document Routes     ==//============//
//=========================//            //
app.post('/document', DocumentController.createDocument);
app.get('/document', DocumentController.fetchDocument);



  //=========================//            //
 //==    Catch All Route  ==//============//
//=========================//            //
app.get('*', (req,res) => {
    res.status(200).send({
        "message": "welcome"
    });
});

app.listen(port, () => {
  console.log('App running on port ',port);
})
export default app;
