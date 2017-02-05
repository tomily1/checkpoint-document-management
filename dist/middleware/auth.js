'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECRET_KEY = process.env.SECRET || 'secret';
/**
 * Class to implement authentication middlewares
 */

var Authenticator = function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);
  }

  _createClass(Authenticator, null, [{
    key: 'authenticateUser',

    /**
     * Method to authenticate a user before proceeding
     * to protected routes
     */
    value: function authenticateUser(request, response, next) {
      var token = request.headers.authorization || request.headers['x-access-token'] || request.body.token;
      if (token) {
        _jsonwebtoken2.default.verify(token, SECRET_KEY, function (error, decoded) {
          if (error) {
            response.status(401).send({
              status: 'Failed',
              message: 'Authentication failed due to invalid token!'
            });
          } else {
            request.decoded = decoded;
            next();
          }
        });
      } else {
        response.status(401).json({
          status: 'Failed',
          message: 'Authentication required for this route'
        });
      }
    }
    /**
     * method to authenticate Admin before proceeding
     * @function authenticateAdmin
     * @returns {void}
     */

  }, {
    key: 'authenticateAdmin',
    value: function authenticateAdmin(request, response, next) {
      _models2.default.Role.findOne({ where: { id: request.decoded.RoleId } }).then(function (role) {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(403).send({
            success: false,
            message: 'You are not permitted to perform this operation'
          });
        }
      }).catch(function (error) {
        return response.status(404).send(error);
      });
    }
  }]);

  return Authenticator;
}();

exports.default = Authenticator;