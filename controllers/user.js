const User = require("../models/user");
const bcrypt = require('bcrypt');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
        const { userfirstname, userlastname, email, password } = req.body;

        // Vérifier si l'email existe déjà dans la base de données
        User.findOne({ email: email }).then(existingUser => {
            if (existingUser) {
                // Si un utilisateur avec cet email existe déjà, renvoyer une réponse d'erreur
                return res.status(400).send({ error: 'Un utilisateur avec cet email existe déjà.' });

            } else {
                // Si l'email n'existe pas encore, continuer avec la création de l'utilisateur
                bcrypt.hash(password, 10).then(hashPassword => {
                    const user = new User({
                        userfirstname: userfirstname,
                        userlastname: userlastname,
                        email: email,
                        password: hashPassword
                    });

                    user.save().then(() => {
                        res.send({ result: `Création de l'utilisateur ${user.firstname} ${user.lastname}` });
                    });
                });
            }
        });
    },

    changeAvatar(req, res) {
        const id = req.params.id;
        User.findById(id).then(user => {
            user.avatar = req.file.filename;
            user.save();
            res.send({ avatar: user.avatar });
        });
    }
}