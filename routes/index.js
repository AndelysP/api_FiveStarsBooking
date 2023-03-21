const ShipController = require("../controllers/ship");
const UserController = require("../controllers/user");
const nodemailer = require("nodemailer");

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

    server.post('/contact', function (req, res) {
        UserController.contact(req, res);
    });

    server.post('/resetPassword', function (req, res) {
        UserController.forgetPassword(req, res);
    })
    // server.post("/ships", (req, res) => {
    //     ShipController.create(req, res);
    // });

    // server.delete("/ships/:id", (req, res) => {
    //     ShipController.delete(req, res);
    // })
}