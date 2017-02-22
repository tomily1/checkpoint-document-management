import db from '../models';

const Roles = db.Role;
/**
 * Class to implement Role controlllers
 */
class RoleController {
  /**
   * Method to verify the creation of a new Role
   * @param{Object} request - Request Object
   * @return{Object} - Return request parameters
   */
  static postRole(request) {
    return (
      request.body &&
      request.body.title
    );
  }
  /**
   * Method to create a a new Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static createRole(request, response) {
    if (RoleController.postRole(request)) {
      return Roles
        .create({
          title: request.body.title
        })
        .then(role => response.status(201).send(role));
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
  static fetchRoles(request, response) {
    Roles.findAll({})
      .then(role => response.status(201).send(role));
  }
  /**
   * Method to delete a Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static deleteRole(request, response) {
    Roles.findOne({ where: { id: request.params.id } })
      .then((role) => {
        if (role) {
          role.destroy()
            .then(() => response.status(200).send({
              success: true,
              message: 'Role Successfully deleted from database'
            }));
        } else {
          response.status(404).send({
            success: false,
            message: 'Role not found'
          });
        }
      })
      .catch(error => response.status(401).send(error));
  }

}
export default RoleController;
