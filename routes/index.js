const ShipController = require("../controllers/ship");
const UserController = require("../controllers/user");
const auth = require('../middleware/auth');

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

    server.get("/users/:id", auth, (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", (req, res) => {
        UserController.create(req, res);
    });

    server.post("/login", (req, res) => {
        UserController.login(req, res);
    });

    server.post('/contact', function (req, res) {
        UserController.contact(req, res);
    });

    server.post('/forgetPassword', function (req, res) {
        UserController.forgetPassword(req, res);
    });

    server.post("/resetPassword", (req, res) => {
        UserController.resetPassword(req, res);
    });
}