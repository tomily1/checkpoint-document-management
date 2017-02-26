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
   * @param {Object} request - The request Object
   * @param {Object} response - The response Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
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
   * Method to generate a token for a user
   * @param{Object} user - User Object
   * @return{String} - Token string
   */
  static generateToken(user) {
    return jwt.sign({
      RoleId: user.RoleId,
      UserId: user.id
    }, SECRET_KEY, { expiresIn: 86400 });
  }

  /**
   * Method to verify that user is an Admin
   * to access Admin endpoints
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @param{Object} next - Function to pass flow to the next controller
   * @return{Void} - returns Void
   */
  static authenticateAdmin(request, response, next) {
    db.Role.findOne({ where: { id: request.decoded.RoleId } })
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(403).send({
            success: false,
            message: 'You are not permitted to perform this operation'
          });
        }
      });
  }
}
export default Authenticator;
