import express from 'express';
import UserController from '../controllers/userController';
import DocumentController from '../controllers/documentController';
import Authenticator from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(Authenticator.authenticateUser,
        Authenticator.authenticateAdmin, UserController.fetchAllUsers)
    .post(UserController.createUser);

router.route('/:id')
    .get(UserController.fetchUser)
    .delete(UserController.deleteUser)
    .put(UserController.updateUser);
router.route('/:id/documents')
    .get(Authenticator.authenticateUser, DocumentController.fetchUserDocument);

router.route('/login')
    .post(UserController.loginUser);

router.route('/logout')
    .post(UserController.logoutUser);

export default router;
