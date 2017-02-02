const Users = require('../models/users');


class UserController {
  /**
   * 
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
   * 
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
        .then(user => res.status(201).send(user))
        .catch(error => res.status(401).send(error));
    }
  }
  /**
   * 
   */
  static fetchUser(request, response) {
    Users.findOne({ where: { id: request.params.id } })
      .then((user) => {
        if (user) {
          response.status(200).send(user);
        } else {
          response.status(404).send({
            status: 'Failed',
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
}
export default UserController;

// module.exports = {
//     create (req, res){
//         return Users
//             .create({
//                 username: req.body.username,
//                 firstName: req.body.fname,
//                 lastName: req.body.lname,
//                 password: req.body.pword,
//                 email: req.body.email,
//                 RoleId: req.body.rId,
//             })
//             .then(user => res.status(201).send(user))
//             .catch(error => res.status(401).send(error));
//     },
//     index(req, res) {
//         return Users
//             .all()
//             .then(user => res.status(201).send(user))
//             .catch(error => res.status(401).send(error));

//     }
// }