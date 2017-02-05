import express from 'express';
import RoleController from '../controllers/roleController';

const router = express.Router();

router.route('/')
  .get(RoleController.fetchRoles)
  .post(RoleController.createRole);
router.route('/:id')
    .delete(RoleController.deleteRole);

export default router;
