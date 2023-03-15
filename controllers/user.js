const User = require("../models/user");

module.exports = {
    getAll(req, res) {
        User.find().then(users => {
            res.send(users);
        });
    },
    get(req, res) {
        const id = req.params.id;
        User.findById(id).then(user => {
            res.send(user);
        });
    },
    create(req, res) {
        const user = new User({
            userfirstname: req.body.userfirstname,
            userlastname: req.body.userlastname,
            email: req.body.email,
            password: req.body.password
        });
        user.save().then(() => {
            res.send({ result: `Création de l'utilisateur' ${user.firstname} ${user.lastname}` });
        });
    }
}