'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Documents = _models2.default.documents;
var Users = _models2.default.users;

/**
 * Controller for document management
 */

var DocumentController = function () {
  function DocumentController() {
    _classCallCheck(this, DocumentController);
  }

  _createClass(DocumentController, null, [{
    key: 'postRequest',

    /**
     * Method to set the various document routes
     * @param{Object} request - Server request
     * @return{Void} return Void
     */
    value: function postRequest(request) {
      return request.body && request.body.title && request.body.content && request.body.access && request.decoded.UserId;
    }
    /**
     * Method used to create new Document for a particular user
     * @param{Object} request - Server Request
     * @param{Object} response - Server Response
     * @returns{Void} return Void
     */

  }, {
    key: 'createDocument',
    value: function createDocument(request, response) {
      if (DocumentController.postRequest(request)) {
        Documents.create({
          title: request.body.title,
          content: request.body.content,
          access: request.body.access ? request.body.access : 'public',
          OwnerId: request.decoded.UserId
        }).then(function (document) {
          response.status(201).send({
            success: true,
            message: 'Document successfully created',
            document: document.dataValues
          });
        }).catch(function (error) {
          response.status(401).send({
            success: false,
            message: error.message
          });
        });
      } else {
        response.status(404).send({
          success: false,
          message: 'Some fields are missing'
        });
      }
    }
    /**
     * Fetch specific document in the database
     * Admin has access to all the documents
     * Users only have access to their private documents and all other public documents.
     * @param{Object} request - Server request
     * @param{Object} response - Server response
     * @return {Void} - returns Void
     */

  }, {
    key: 'fetchDocuments',
    value: function fetchDocuments(request, response) {
      Documents.findOne({
        where: {
          id: request.params.id
        },
        include: [{
          model: _models2.default.users,
          attributes: ['RoleId']
        }]
      }).then(function (result) {
        var document = result ? result.dataValues : null;
        if (document) {
          // if the requester's role id is Admin, allow unrestricted access
          if (request.decoded.RoleId === 1) {
            response.status(200).send({
              success: true,
              message: 'Document found',
              document: document
            });
          } else if ((document.access === 'public' || document.user.dataValues.RoleId === request.decoded.RoleId) && document.access !== 'private') {
            response.status(200).send({
              success: true,
              message: 'Document Found',
              document: document
            });
          } else if (document.access === 'private' && document.OwnerId === request.decoded.UserId) {
            response.status(200).send({
              success: true,
              message: 'Document Found',
              document: document
            });
          } else {
            response.status(403).send({
              success: false,
              message: 'Forbidden!, You are forbidden to access this document'
            });
          }
        } else {
          response.status(404).send({
            success: false,
            message: 'Document with id ' + request.params.id + ' not found in the database'
          });
        }
      });
    }
    /**
     * Fetch specific document in the database
     * Admin has access to all the documents
     * Users only have access to their private documents and all other public documents.
     * @param{Object} request - Server request
     * @param{Object} response - Server response
     * @return {Void} - returns Void
     */

  }, {
    key: 'fetchDocument',
    value: function fetchDocument(request, response) {
      var searchQuery = request.query.search;
      var searchLimit = request.query.limit;
      var Role = request.decoded.RoleId;
      var queryBuilder = {
        attributes: ['id', 'OwnerId', 'access', 'title', 'content', 'createdAt'],
        include: [{
          model: _models2.default.users,
          attributes: ['RoleId']
        }],
        order: '"createdAt" DESC'
      };
      if (searchLimit) {
        queryBuilder.limit = searchLimit;
      }
      if (searchQuery) {
        queryBuilder.where = {
          $or: [{
            title: { $like: '%' + searchQuery + '%' }
          }, {
            content: { $like: '%' + searchQuery + '%' }
          }]
        };
      }
      Documents.findAll(queryBuilder).then(function (results) {
        if (results) {
          (function () {
            var searchResult = [];
            results.forEach(function (document) {
              if (Role === 1) {
                searchResult.push(document.dataValues);
              } else if ((document.access === 'public' || document.user.dataValues.RoleId === request.decoded.RoleId) && document.access !== 'private') {
                searchResult.push(document.dataValues);
              } else if (document.access === 'private' && document.OwnerId === request.decoded.UserId) {
                searchResult.push(document.dataValues);
              }
            });
            response.status(302).send({
              success: true,
              message: 'Documents matching ' + searchQuery,
              documents: searchResult
            });
          })();
        } else {
          response.status(401).send({
            success: false,
            message: 'Document not found'
          });
        }
      }).catch(function (error) {
        response.status(401).send({
          success: false,
          message: error.message
        });
      });
    }
    /**
     * Fetch all the documents belonging to a particular user
     * Users have access to their own documents and all other public and role access documents
     * @param{Object} request - Server request
     * @param{Object} response - Server response
     * @return{Void} - return Void
     */

  }, {
    key: 'fetchUserDocument',
    value: function fetchUserDocument(request, response) {
      var userRole = request.decoded.RoleId;
      var Owner = request.decoded.UserId;
      var queryBuilder = {
        attributes: ['id', 'email', 'firstName', 'lastName'],
        include: [{
          model: Documents,
          attributes: ['id', 'title', 'content', 'createdAt']
        }]
      };
      Users.findById(request.params.id, queryBuilder).then(function (results) {
        if (results) {
          (function () {
            var result = results.dataValues.documents;
            var searchResult = [];
            result.forEach(function (document) {
              if (userRole === 1) {
                searchResult.push(document.dataValues);
              } else if ((document.access === 'public' || document.user.dataValues.RoleId === userRole) && document.access !== 'private') {
                searchResult.push(document.dataValues);
              } else if (document.access === 'private' && document.OwnerId === Owner) {
                searchResult.push(document.dataValues);
              }
            });
            response.status(200).send({
              success: true,
              message: 'documents belonging to user id: ' + request.params.id + ' found',
              documents: searchResult
            });
          })();
        } else {
          response.status(404).send({
            success: false,
            message: 'No document found for this user as User with id ' + request.params.id + ' does not exist'
          });
        }
      }).catch(function (error) {
        response.status(401).send({
          success: false,
          message: error.message
        });
      });
    }
    /**
     * Edit and Update User documents in the database
     * Users only have access to their own documents
     * @param{Object} request - Server request
     * @param{Object} response - Server response
     * @return {Void} - returns Void
     */

  }, {
    key: 'updateDocument',
    value: function updateDocument(request, response) {
      var Owner = request.decoded.UserId;
      var Role = request.decoded.RoleId;
      Documents.findOne({
        where: {
          id: request.params.id
        }
      }).then(function (document) {
        if (document.OwnerId === Owner || Role === 1) {
          document.update(request.body).then(function (updatedDocument) {
            return response.status(201).send(updatedDocument);
          }).catch(function (error) {
            return response.status(401).send(error);
          });
        } else {
          response.status(403).send({
            success: false,
            role: Role,
            message: 'Forbidden, You are not authorized tos update this document as it doesn\'t belong to you'
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
    /**
     * Delete User documents in the database
     * Users only have access to their own documents
     * @param{Object} request - Server request
     * @param{Object} response - Server response
     * @return {Void} - returns Void
     */

  }, {
    key: 'deleteDocument',
    value: function deleteDocument(request, response) {
      var Owner = request.decoded.UserId;
      var Role = request.decoded.RoleId;
      Documents.findOne({
        where: {
          id: request.params.id
        }
      }).then(function (document) {
        if (document.OwnerId === Owner || Role === 1) {
          document.destroy().then(function () {
            return response.status(201).send({
              success: true,
              message: 'Document ' + request.params.id + ' has been successfully deleted'
            });
          }).catch(function (error) {
            return response.status(401).send(error);
          });
        } else {
          response.status(403).send({
            success: false,
            message: 'Forbidden, You are not authorized to delete this document as it doesn\'t belong to you'
          });
        }
      }).catch(function (error) {
        return response.status(401).send(error);
      });
    }
  }]);

  return DocumentController;
}();

exports.default = DocumentController;