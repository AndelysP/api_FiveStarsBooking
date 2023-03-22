const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

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
                    })

                    user.save().then(() => {
                        res.send({ result: `Création de l'utilisateur ${user.firstname} ${user.lastname}` })
                    })
                });

            }
        })
    },

    forgetPassword(req, res) {

        const { email } = req.body;

        const secretKey = 'kM4vQ4Dn9AZ7F3Jp8KtRcSg6Ew2YhBxN';
        const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
        const resetUrl = `http://localhost:3000/reset/${token}`;

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ed743c759844c1",
                pass: "aaa2330573bfed"
            }
        });

        const mailOptions = {
            from: 'contact@5starsbooking.com',
            to: `${req.body.email}`,
            subject: 'Réinitialisation du mot de passe',
            html: `
                <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
                <div style="max-width: 700px; background-color: white; margin: 0 auto">
                <div style="width: 100%; background-color: #1B212B; padding: 20px 0">
                    <img
                        src="https://www.zupimages.net/up/23/10/yk9e.png"
                        style="width: 100%; height: 70px; object-fit: contain"
                    />          
                </div>
                <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                  Five Star's Booking
                </p>
                <div style="font-size: .8rem; margin: 0 30px">
                <p>Bonjour,\n\nCliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetUrl}">Réinitialisez votre mot de passe</a><br/>Le lien expire dans 1h<br/>Cordialement,<br/>L'équipe de support</p>
                </div>
                </div>
                </div>
                </div>
                `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Erreur lors de l\'envoi du message');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Message envoyé avec succès');
            }
        });
    },

    async resetPassword(req, res) {
        const { email, newPassword, token } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Utilisateur introuvable " });
            }

            jwt.verify(token, secretKey, async (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: "Token invalide ou expiré" });
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;

                await user.save();

                return res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
            })


        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe" });
        }
    },

    contact(req, res) {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ed743c759844c1",
                pass: "aaa2330573bfed"
            }
        });

        const mailOptions = {
            from: `${req.body.email}`,
            to: 'hewecob405@fenwazi.com',
            subject: 'Réception d\'une de demande de contact',
            html: `
                <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
                <div style="max-width: 700px; background-color: white; margin: 0 auto">
                <div style="width: 100%; background-color: #1B212B; padding: 20px 0">
                    <img
                        src="https://www.zupimages.net/up/23/10/yk9e.png"
                        style="width: 100%; height: 70px; object-fit: contain"
                    />          
                </div>
                <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                  Five Star's Booking
                </p>
                <div style="font-size: .8rem; margin: 0 30px">
                  <p>Nom / Prénom: <b>${req.body.name}</b></p>
                  <p>E-mail: <b>${req.body.email}</b></p>
                  <p>Téléphone: <b>${req.body.phone}</b></p>
                  <p>Message: <i>${req.body.message}</i></p>
                </div>
                </div>
                </div>
                </div>
                `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Erreur lors de l\'envoi du message');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Message envoyé avec succès');
            }
        });
    },

    //fonction login
    login(req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'login/mot de passe incorrect' });
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
