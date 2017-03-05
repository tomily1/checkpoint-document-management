/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import express from 'express';
import UserController from '../controllers/userController';
import DocumentController from '../controllers/documentController';
import Authenticator from '../middleware/authenticator';

const router = express.Router();

router.route('/')
  .get(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.fetchAllUsers)
  .post(UserController.createUser);
router.route('/admin')
  .post(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.createAdmin);

router.route('/:id')
  .get(Authenticator.authenticateUser, Authenticator.authenticateAdmin, UserController.fetchUser)
  .delete(Authenticator.authenticateUser,
  Authenticator.authenticateAdmin, UserController.deleteUser)
  .put(Authenticator.authenticateUser, UserController.updateUser);
router.route('/:id/documents')
  .get(Authenticator.authenticateUser, DocumentController.fetchUserDocument);

router.route('/login')
  .post(UserController.loginUser);

router.route('/logout')
  .post(UserController.logoutUser);

export default router;
