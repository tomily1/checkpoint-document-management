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

var DocumentController = function () {
    function DocumentController() {
        _classCallCheck(this, DocumentController);
    }

    _createClass(DocumentController, null, [{
        key: 'postRequest',

        /**
         * Method to set the various document routes
         * @param{Object} app - Express app
         * @return{Void}
         */
        value: function postRequest(request) {
            return request.body && request.body.title && request.body.content && request.body.access && request.body.OwnerId;
        }
        /**
         * Method used to create new Document for a particular user
         * @param{Object} app - Express app
         * @returns{response data}
         */

    }, {
        key: 'createDocument',
        value: function createDocument(request, response) {
            if (DocumentController.postRequest(request)) {
                return Documents.create({
                    title: request.body.title,
                    content: request.body.content,
                    access: request.body.access,
                    OwnerId: request.body.OwnerId
                }).then(function (document) {
                    return response.status(201).send(document);
                }).catch(function (error) {
                    return response.status(401).send(error);
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: 'some fields are missing'
                });
            }
        }
        /**
         * Method used to fetch documents for all users
         * @param{Object} app - Express app
         * @returns{response data}
         * 
         */

    }, {
        key: 'fetchDocument',
        value: function fetchDocument(request, response) {
            Documents.findAll({}).then(function (document) {
                if (document) {
                    response.status(201).send(document);
                } else {
                    response.status(404).json({
                        status: 'Failed',
                        message: 'Document not found'
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