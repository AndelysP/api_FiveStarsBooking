const User = require("../models/user");
const bcrypt = require('bcrypt');

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
        const { userfirstname, userlastname, email, password } = req.body
        bcrypt.hash(password, 10).then(hashPassword => {
            const user = new User({
                userfirstname: userfirstname,
                userlastname: userlastname,
                email: email,
                password: hashPassword
            });

            user.save().then(() => {
                res.send({ result: `Création de l'utilisateur' ${user.firstname} ${user.lastname}` });
            });
        });
    }
}