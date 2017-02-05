import express from 'express';
import DocumentController from '../controllers/documentController';

const router = express.Router();

router.route('/')
    .get(DocumentController.fetchDocument)
    .post(DocumentController.createDocument);

export default router;
