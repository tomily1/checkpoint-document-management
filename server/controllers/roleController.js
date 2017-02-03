import db from '../models';

const Roles = db.Role;

class RoleController {

  static postRole(request, response) {
    return (
      request.body &&
      request.body.title
    )
  }

  static createRole(request, response) {
    if (RoleController.postRole(request)) {
      return Roles
        .create({
          title: request.body.title
        })
        .then(role => response.status(201).send(role))
        .catch(error => response.status(401).send(error));
    } else {
      response.status(404).send({
        success: false,
        message: 'Error! request.body.title not found'
      })
    }
  }
  static fetchRoles(request, response) {
    Roles.findAll({})
      .then(role => response.status(201).send(role))
      .catch(error => response.status(401).send(error));
  }
  static deleteRole(request, response) {
    Roles.findOne({ where: { id: request.params.id } })
      .then(role => {
        if (role) {
          role.destroy()
            .then(() => response.status(200).send({
              success: true,
              message: 'Role Successfully deleted from database'
            }))
            .catch(error => response.status(401).send(error));
        } else {
          response.status(404).send({
            success: false,
            message: 'Role not found'
          })
        }
      })
      .catch(error => response.status(401).send(error));
  }

}
export default RoleController;
