import DocumentsRoute from './documents';
import RolesRoute from './roles';
import UsersRoute from './users';

/**
 * IndexRoute contains all the routes for the api
 */
class IndexRoute {
  /**
   * Index IndexRoute for catch all
   * @param{Object} app express app
   * @return{Void} return void
   */
  static Index(app) {
    app.get('*', (req, res) => {
      res.status(200).send({
        message: 'welcome to document management api'
      });
    });
  }
  /**
   * Roles Route
   * @param{Object} app express app
   * @return{Void} return void
   */
  static Roles(app) {
    app.use('/roles', RolesRoute);
  }
  /**
   * Users Route
   * @param{Object} app express app
   * @return{Void} return void
   */
  static Users(app) {
    app.use('/users', UsersRoute);
  }
  /**
   * Documents Route
   * @param{Object} app express app
   * @return{Void} return void
   */
  static Documents(app) {
    app.use('/documents', DocumentsRoute);
  }

}
export default IndexRoute;
