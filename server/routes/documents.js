import express from 'express';
import DocumentController from '../controllers/documentController';
import Authenticate from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(Authenticate.authenticateUser, Authenticate.authenticateAdmin, DocumentController.fetchDocument)
    .post(Authenticate.authenticateUser, DocumentController.createDocument);

export default router;
