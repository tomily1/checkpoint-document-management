var Documents = require('../models').documents;

module.exports = {
    create (req, res){
        return Documents
            .create({
                title: req.body.title,
                content: req.body.content,
                access: req.body.access,
                OwnerId: req.body.oId,
            })
            .then(document => res.status(201).send(document))
            .catch(error => res.status(401).send(error));

    },
    index (req, res) {
        return Documents 
            .all()
            .then(document => res.status(201).send(document))
            .catch(error => res.status(401).send(error));
    }
}