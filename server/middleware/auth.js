import jwt from 'jsonwebtoken';
import db from '../models';

const SECRET_KEY = process.env.SECRET || 'secret';
/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   */
  static authenticateUser(request, response, next) {
    const token = request.headers.authorization ||
      request.headers['x-access-token'] ||
      request.body.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
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
  static authenticateAdmin(request, response, next){
    db.Role.findOne({where: {id: request.decoded.RoleId}})
        .then(role => {
          if(role.title === 'admin'){
            next();
          } else {
            response.status(403).send({
              success: false,
              message: 'You are not permitted to perform this operation'
            })
          }
        })
        .catch(error => response.status(404).send(error));

  }
}
export default Authenticator;
