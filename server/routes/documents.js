/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

import express from 'express';
import DocumentController from '../controllers/documentController';
import Authenticate from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocument)
    .post(Authenticate.authenticateUser, DocumentController.createDocument);

router.route('/:id')
    .get(Authenticate.authenticateUser, DocumentController.fetchDocuments)
    .put(Authenticate.authenticateUser, DocumentController.updateDocument)
    .delete(Authenticate.authenticateUser,
            DocumentController.deleteDocument);
export default router;
