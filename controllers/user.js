const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },

    //fonction login
    login(req, res){
        User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'login/mot de passe incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'login/mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
}