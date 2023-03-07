const ShipController = require("../controllers/ship");
const nodemailer = require("nodemailer");

module.exports = server => {
    server.get("/ships", (req, res) => {
        ShipController.getAll(req, res);
    });

    server.get("/ships/:id", (req, res) => {
        ShipController.get(req, res);
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
            subject: 'Contact form test',
            html: `
                <p>Name: ${req.body.name}</p>
                <p>Email: ${req.body.email}</p>
                <p>Téléphone: ${req.body.phone}</p>
                <p>Message: ${req.body.message}</p>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Erreur lors de l\'envoie du message');
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