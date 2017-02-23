/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import express from 'express';
import RoleController from '../controllers/roleController';
import Authenticator from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(Authenticator.authenticateUser, Authenticator.authenticateAdmin, RoleController.fetchRoles)
  .post(Authenticator.authenticateUser, Authenticator.authenticateAdmin, RoleController.createRole);
router.route('/:id')
    .delete(RoleController.deleteRole);

export default router;
