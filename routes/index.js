const ShipController = require("../controllers/ship");
const UserController = require("../controllers/user");
const nodemailer = require("nodemailer");
const multer  = require('multer');
var fs = require('fs');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})

module.exports = server => {
    server.get("/ships", (req, res) => {
        ShipController.getAll(req, res);
    });

    server.get("/ships/:id", (req, res) => {
        ShipController.get(req, res);
    });

    server.get("/users", (req, res) => {
        UserController.getAll(req, res);
    });

    server.get("/users/:id", (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", (req, res) => {
        UserController.create(req, res);
    });

    server.post('/users/:id', upload.single('avatar'), (req, res) => {
        UserController.changeAvatar(req, res);
    });

    server.post('/contact', function (req, res) {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "42e506b5471a1d",
                pass: "d7bc80cb0b7fe4"
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
    });

    // server.post("/ships", (req, res) => {
    //     ShipController.create(req, res);
    // });

    // server.delete("/ships/:id", (req, res) => {
    //     ShipController.delete(req, res);
    // })
}