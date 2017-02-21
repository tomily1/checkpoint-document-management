import express from 'express';
import DocumentController from '../controllers/documentController';
import Authenticate from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(Authenticate.authenticateUser, Authenticate.authenticateAdmin, DocumentController.fetchDocuments)
    .post(Authenticate.authenticateUser, DocumentController.createDocument);

router.route('/:id')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocument)
    .put(Authenticate.authenticateUser, DocumentController.updateDocument)
    .delete(Authenticate.authenticateUser, DocumentController.deleteDocument);
export default router;
