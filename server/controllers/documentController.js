// var Documents = require('../models/documents');
import db from '../models';

const Documents = db.documents;

class DocumentController {
    /**
     * 
     */
    static postRequest(request) {
        return (
            request.body &&
            request.body.title &&
            request.body.content &&
            request.body.access &&
            request.body.OwnerIds
        )
    }
    /**
     * 
     */
    static createDocument(request, response) {
        if (DocumentController.postRequest(request)) {
            return Documents
                .create({
                    title: request.body.title,
                    content: request.body.content,
                    access: request.body.access,
                    OwnerId: request.body.oId,
                })
                .then(document => response.status(201).send(document))
                .catch(error => response.status(401).send(error));
        } else {
            response.status(404).send({
                success: false,
                message: 'some fields are missing'
            });
        }
    }
    /**
     * 
     */
    static fetchDocument(request, response) {
       // console.dir(Documents);
        Documents.findAll({})
            .then(document => {
                if (document) {
                    response.status(201).send(document);
                } else {
                    response.status(404).json({
                        status: 'Failed',
                        message: 'Document not found'
                    })
                }
            })
            .catch(error => response.status(401).send(error));
    }

}
export default DocumentController;

// module.exports = {
//     create (req, res){
//         return Documents
//             .create({
//                 title: req.body.title,
//                 content: req.body.content,
//                 access: req.body.access,
//                 OwnerId: req.body.oId,
//             })
//             .then(document => res.status(201).send(document))
//             .catch(error => res.status(401).send(error));

//     },
//     index (req, res) {
//         return Documents 
//             .all()
//             .then(document => res.status(201).send(document))
//             .catch(error => res.status(401).send(error));
//     }
// }