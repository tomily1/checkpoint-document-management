var Users = require('../models').users;

module.exports = {
    create (req, res){
        return Users
            .create({
                username: req.body.username,
                firstName: req.body.fname,
                lastName: req.body.lname,
                password: req.body.pword,
                email: req.body.email,
                RoleId: req.body.rId,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(401).send(error));
    },
    index(req, res) {
        return Users
            .all()
            .then(user => res.status(201).send(user))
            .catch(error => res.status(401).send(error));

    }
}