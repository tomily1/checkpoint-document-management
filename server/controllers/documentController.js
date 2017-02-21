import db from '../models';

const Documents = db.documents;
const Users = db.users;

/**
 * Controller for document management
 */
class DocumentController {
  /**
   * Method to set the various document routes
   * @param{Object} request - Server request
   * @return{Void} return Void
   */
  static postRequest(request) {
    return (
      request.body &&
      request.body.title &&
      request.body.content &&
      request.body.access &&
      request.decoded.UserId
    );
  }
  /**
   * Method used to create new Document for a particular user
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static createDocument(request, response) {
    if (DocumentController.postRequest(request)) {
      Documents
        .create({
          title: request.body.title,
          content: request.body.content,
          access: request.body.access ? request.body.access : 'public',
          OwnerId: request.decoded.UserId,
        })
        .then((document) => {
          response.status(201).send({
            success: true,
            message: 'Document successfully created',
            document: document.dataValues
          });
        })
        .catch((error) => {
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
  static fetchDocuments(request, response) {
    Documents.findOne({
      where: {
        id: request.params.id
      },
      include: [{
        model: db.users,
        attributes: ['RoleId']
      }]
    }).then((result) => {
      const document = result ? result.dataValues : null;
      if (document) {
        // if the requester's role id is Admin, allow unrestricted access
        if (request.decoded.RoleId === 1) {
          response.status(200).send({
            success: true,
            message: 'Document found',
            document
          });
        } else if ((document.access === 'public' ||
          document.user.dataValues.RoleId === request.decoded.RoleId)
          && document.access !== 'private') {
          response.status(200).send({
            success: true,
            message: 'Document Found',
            document
          });
        } else if (document.access === 'private' && document.OwnerId === request.decoded.UserId) {
          response.status(200).send({
            success: true,
            message: 'Document Found',
            document
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
          message: `Document with id ${request.params.id} not found in the database`
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
  static fetchDocument(request, response) {
    const searchQuery = request.query.search;
    const searchLimit = request.query.limit;
    const Role = request.decoded.RoleId;
    const queryBuilder = {
      attributes: ['id', 'OwnerId', 'access', 'title', 'content', 'createdAt'],
      include: [{
        model: db.users,
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
          title:
          { $like: `%${searchQuery}%` }
        }, {
          content:
          { $like: `%${searchQuery}%` }
        }]
      };
    }
    Documents.findAll(queryBuilder)
      .then((results) => {
        if (results) {
          const searchResult = [];
          results.forEach((document) => {
            if (Role === 1) {
              searchResult.push(document.dataValues);
            } else if ((document.access === 'public' ||
              document.user.dataValues.RoleId === request.decoded.RoleId)
              && document.access !== 'private') {
              searchResult.push(document.dataValues);
            } else if (document.access === 'private' && document.OwnerId === request.decoded.UserId) {
              searchResult.push(document.dataValues);
            }
          });
          response.status(302).send({
            success: true,
            message: `Documents matching ${searchQuery}`,
            documents: searchResult
          });
        } else {
          response.status(401).send({
            success: false,
            message: 'Document not found'
          });
        }
      })
      .catch((error) => {
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
  static fetchUserDocument(request, response) {
    const userRole = request.decoded.RoleId;
    const Owner = request.decoded.UserId;
    const queryBuilder = {
      attributes: ['id', 'email', 'firstName', 'lastName'],
      include: [{
        model: Documents,
        attributes: ['id', 'title', 'content', 'createdAt'],
      }]
    };
    Users.findById(request.params.id, queryBuilder)
      .then((results) => {
        if (results) {
          const result = results.dataValues.documents;
          const searchResult = [];
          result.forEach((document) => {
            if (userRole === 1) {
              searchResult.push(document.dataValues);
            } else if ((document.access === 'public' ||
              document.user.dataValues.RoleId === userRole)
              && document.access !== 'private') {
              searchResult.push(document.dataValues);
            } else if (document.access === 'private' && document.OwnerId === Owner) {
              searchResult.push(document.dataValues);
            }
          });
          response.status(200).send({
            success: true,
            message: `documents belonging to user id: ${request.params.id} found`,
            documents: searchResult
          });
        } else {
          response.status(404).send({
            success: false,
            message: `No document found for this user as User with id ${request.params.id} does not exist`
          });
        }
      })
      .catch((error) => {
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
  static updateDocument(request, response) {
    const Owner = request.decoded.UserId;
    const Role = request.decoded.RoleId;
    Documents.findOne({
      where: {
        id: request.params.id
      }
    })
      .then((document) => {
        if (document.OwnerId === Owner || Role === 1) {
          document.update(request.body)
            .then(updatedDocument => response.status(201).send(updatedDocument))
            .catch(error => response.status(401).send(error));
        } else {
          response.status(403).send({
            success: false,
            role: Role,
            message: 'Forbidden, You are not authorized tos update this document as it doesn\'t belong to you'
          });
        }
      })
      .catch(error => response.status(401).send(error));
  }
  /**
   * Delete User documents in the database
   * Users only have access to their own documents
   * @param{Object} request - Server request
   * @param{Object} response - Server response
   * @return {Void} - returns Void
   */
  static deleteDocument(request, response) {
    const Owner = request.decoded.UserId;
    const Role = request.decoded.RoleId;
    Documents.findOne({
      where: {
        id: request.params.id
      }
    })
      .then((document) => {
        if (document.OwnerId === Owner || Role === 1) {
          document.destroy()
            .then(() => response.status(201).send({
              success: true,
              message: `Document ${request.params.id} has been successfully deleted`
            }))
            .catch(error => response.status(401).send(error));
        } else {
          response.status(403).send({
            success: false,
            message: 'Forbidden, You are not authorized to delete this document as it doesn\'t belong to you'
          });
        }
      })
      .catch(error => response.status(401).send(error));
  }

}
export default DocumentController;
