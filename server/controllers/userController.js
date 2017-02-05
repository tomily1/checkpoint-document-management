import db from '../models';
import jwt from 'jsonwebtoken';
const Users = db.users;
const SECRET_KEY = process.env.SECRET || 'secret';

class UserController {
  /**
    * Method to set the various user routes
    * @param{Object} app - Express app
    * @return{Void}
    */
  static postRequest(request) {
    return (
      request.body &&
      request.body.username &&
      request.body.firstname &&
      request.body.lastname &&
      request.body.password &&
      request.body.email &&
      request.body.RoleId
    )
  }
  /**
    * Method to create a new user
    * @param{Object} app - Express app
    * @return{Void}
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
          RoleId: request.body.RoleId
        })
        .then(user => response.status(201).send(user))
        .catch(error => response.status(401).send(error));
    }
  }
  /**
   * 
   */
  static deleteUser(request, response) {
    Users.findOne({ where: { id: request.params.id } })
      .then(user => {
        if (user) {
          user.destroy()
            .then(() => response.status(200).send({
              success: true,
              message: 'User Successfully deleted from database'
            }))
            .catch(error => response.status(401).send(error));
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          })
        }
      })
      .catch(error => response.status(401).send(error));
  }
  /**
   * 
   */
  static updateUser(request, response) {
    Users.findOne({
      where: { id: request.params.id }
    })
    .then(user => {
      if(user) {
        user.update(request.body)
        .then(updatedUser => response.status(201).send(updatedUser))
        .catch(error => response.status(401).send(error));
      } else {
        response.status(404).send({
          success: false,
          message: "User not found"
        });
      }
    })
    .catch(error => response.status(401).send(error));
  }
  /**
   * 
   */
  static fetchAllUsers(request, response) {
    Users.findAll({})
      .then(users => {
        if (users) {
          response.status(201).send(users);
        } else {
          response.status(404).send({
            success: false,
            message: 'No user on this database'
          })
        }
      })
      .catch(error => response.status(401).send(error));
  }
  /**
    * Method to fetch all the users on the database
    * @param{Object} app - Express app
    * @return{Void}
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
      })
      .catch((error) => {
        response.status(400).send({
          error
        });
      });
  }
  /**
   * 
   */
  static loginUser(request, response) {
    Users.findOne({where:{email: request.body.email}})
      .then(user => {
         if(user && user.validPassword(request.body.password)){
          const token = jwt.sign({
            RoleId: user.RoleId,
            UserId: user.id
          }, SECRET_KEY, { expiresIn: 86400 });
          response.status(201).send({token, expiresIn: 86400})
        } else {
          response.status(401).send({
            success: false,
            message: 'Failed to Authenticate User, Invalid Password or Email'
          })
        }
      })
      .catch(error => response.status(404).send({
        message: 'Error!'
      }));
  }
  /**
   * 
   */
  static logoutUser(request, response) {
    response.send({
      message: 'User logged out successfully'
    })
  }
}
export default UserController;
