/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import jwt from 'jsonwebtoken';
import db from '../models';
import Authenticate from '../middleware/authenticator';

const Users = db.users;
const SECRET_KEY = process.env.SECRET || 'secret';

/**
 * Controller for Users
 */
class UserController {
  /**
   * Method to set the various document routes
   * @param{Object} request - Server request
   * @return{Object} return request parameters
   */
  static postRequest(request) {
    return (
      request.body &&
      request.body.username &&
      request.body.firstname &&
      request.body.lastname &&
      request.body.password &&
      request.body.email
    );
  }
  /**
   * Method used to create new user
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static createUser(request, response) {
    if (UserController.postRequest(request)) {
      return Users
        .create({
          username: request.body.username,
          firstName: request.body.firstname,
          lastName: request.body.lastname,
          password: request.body.password,
          email: request.body.email,
          roleId: 2
        }).then(user => response.status(201).send({
          success: true,
          message: 'User successfully signed up',
          RoleId: user.roleId,
          token: Authenticate.generateToken(user)
        })).catch(error => response.status(409).send({
          success: false,
          message: `${error.message}`,
          error: error.errors[0].message
        }));
    }
    response.status(400).send({
      success: false,
      message: 'You did not input your field properly'
    });
  }
  /**
   * Method used to create admin user, only accessible to admin user(s).
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static createAdmin(request, response) {
    const UserId = request.decoded.UserId;
    let RoleId;
    Users.findById(UserId).then((user) => { RoleId = user.dataValues.roleId; })
      .then(() => {
        if (RoleId === 1) {
          return Users
            .create({
              username: request.body.username,
              firstName: request.body.firstname,
              lastName: request.body.lastname,
              password: request.body.password,
              email: request.body.email,
              roleId: 1
            }).then((adminUser) => {
              response.status(201).send({
                success: false,
                message: 'Admin user successfully created',
                RoleId: adminUser.roleId,
                token: Authenticate.generateToken(adminUser)
              });
            }).catch(error => response.status(409).send({
              success: false,
              message: `${error.message}`,
              error: error.errors[0].message
            }));
        }
        response.status(401).send({
          success: false,
          message: 'You are not authorized'
        });
      });
  }
  /**
   * Method used to delete user
   * only accessible to admin
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static deleteUser(request, response) {
    Users.findOne({ where: { id: request.params.id } })
      .then((user) => {
        if (user) {
          user.destroy()
            .then(() => response.status(200).send({
              success: true,
              message: 'User Successfully deleted from database'
            }));
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      });
  }
  /**
   * Method used to Update user info
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static updateUser(request, response) {
    const UserId = request.decoded.UserId;
    let RoleId;
    Users.findById(UserId).then((user) => { RoleId = user.dataValues.roleId; });
    Users.findOne({
      where: { id: request.params.id }
    }).then((user) => {
      if (user) {
        if (UserId === user.dataValues.id || RoleId === 1) {
          user.update(request.body)
            .then(updatedUser => response.status(201).send(updatedUser));
        } else {
          response.status(401).send({
            success: false,
            message: 'Unauthorized'
          });
        }
      } else {
        response.status(404).send({
          success: false,
          message: 'User not found'
        });
      }
    }).catch((error) => {
      response.status(401).send({
        success: false,
        message: error.message
      });
    });
  }
  /**
   * Method used to fetch all users
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static fetchAllUsers(request, response) {
    Users.findAll({})
      .then((users) => {
        response.status(201).send(users);
      });
  }
  /**
   * Method used to fetch user by their ID
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static fetchUser(request, response) {
    Users.findOne({ where: { id: request.params.id } })
      .then((user) => {
        if (user) {
          response.status(200).send(user);
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      });
  }
  /**
   * Method used to create new user
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static loginUser(request, response) {
    Users.findOne({ where: { email: request.body.email } })
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          const token = jwt.sign({
            UserId: user.id
          }, SECRET_KEY, { expiresIn: 86400 });
          response.status(201).send({ token, expiresIn: 86400 });
        } else {
          response.status(401).send({
            success: false,
            message: 'Failed to Authenticate User, Invalid Credentials'
          });
        }
      });
  }
  /**
   * Method used to logout user
   * @param{Object} request - Server Request
   * @param{Object} response - Server Response
   * @returns{Void} return Void
   */
  static logoutUser(request, response) {
    response.send({
      success: true,
      message: 'User logged out successfully'
    });
  }
}
export default UserController;
