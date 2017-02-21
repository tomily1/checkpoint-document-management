'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Roles = _models2.default.Role;
/**
 * Class to implement Role controlllers
 */

var RoleController = function () {
  function RoleController() {
    _classCallCheck(this, RoleController);
  }

  _createClass(RoleController, null, [{
    key: 'postRole',

    /**
     * Method to verify the creation of a new Role
     * @param{Object} request - Request Object
     * @return{Void} - Returns void
     */
    value: function postRole(request) {
      return request.body && request.body.title;
    }
    /**
     * Method to create a a new Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'createRole',
    value: function createRole(request, response) {
      if (RoleController.postRole(request)) {
        return Roles.create({
          title: request.body.title
        }).then(function (role) {
          return response.status(201).send(role);
        }).catch(function (error) {
          return response.status(401).send(error);
        });
      }
      response.status(404).send({
        success: false,
        message: 'Error! request.body.title not found'
      });
    }
    /**
     * Method to createa fetch a Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'fetchRoles',
    value: function fetchRoles(request, response) {
      Roles.findAll({}).then(function (role) {
        return response.status(201).send(role);
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
    /**
     * Method to delete a Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'deleteRole',
    value: function deleteRole(request, response) {
      Roles.findOne({ where: { id: request.params.id } }).then(function (role) {
        if (role) {
          role.destroy().then(function () {
            return response.status(200).send({
              success: true,
              message: 'Role Successfully deleted from database'
            });
          }).catch(function (error) {
            return response.status(401).send(error);
          });
        } else {
          response.status(404).send({
            success: false,
            message: 'Role not found'
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
  }]);

  return RoleController;
}();

exports.default = RoleController;