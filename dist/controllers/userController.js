'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.users;

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'postRequest',

    /**
      * Method to set the various user routes
      * @param{Object} app - Express app
      * @return{Void}
      */
    value: function postRequest(request) {
      return request.body && request.body.username && request.body.firstname && request.body.lastname && request.body.password && request.body.email && request.body.RoleId;
    }
    /**
      * Method to create a new user
      * @param{Object} app - Express app
      * @return{Void}
      */

  }, {
    key: 'createUser',
    value: function createUser(request, response) {
      if (UserController.postRequest(request)) {
        return Users.create({
          username: request.body.username,
          firstName: request.body.firstname,
          lastName: request.body.lastname,
          password: request.body.password,
          email: request.body.email,
          RoleId: request.body.RoleId
        }).then(function (user) {
          return response.status(201).send(user);
        }).catch(function (error) {
          return response.status(401).send(error);
        });
      }
    }
    /**
     * 
     */

  }, {
    key: 'deleteUser',
    value: function deleteUser(request, response) {
      Users.findOne({ where: { id: request.params.id } }).then(function (user) {
        if (user) {
          user.destroy().then(function () {
            return response.status(200).send({
              success: true,
              message: 'User Successfully deleted from database'
            });
          }).catch(function (error) {
            return response.status(401).send(error);
          });
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
    /**
     * 
     */

  }, {
    key: 'updateUser',
    value: function updateUser(request, response) {
      Users.findOne({
        where: { id: request.params.id }
      }).then(function (user) {
        if (user) {
          user.update(request.body).then(function (updatedUser) {
            return response.status(201).send(updatedUser);
          }).catch(function (error) {
            return response.status(401).send(error);
          });
        } else {
          response.status(404).send({
            success: false,
            message: "User not found"
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
    /**
     * 
     */

  }, {
    key: 'fetchAllUsers',
    value: function fetchAllUsers(request, response) {
      Users.findAll({}).then(function (users) {
        if (users) {
          response.status(201).send(users);
        } else {
          response.status(404).send({
            success: false,
            message: 'No user on this database'
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
    /**
      * Method to fetch all the users on the database
      * @param{Object} app - Express app
      * @return{Void}
      */

  }, {
    key: 'fetchUser',
    value: function fetchUser(request, response) {
      Users.findOne({ where: { id: request.params.id } }).then(function (user) {
        if (user) {
          response.status(200).send(user);
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      }).catch(function (error) {
        response.status(400).send({
          error: error
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;