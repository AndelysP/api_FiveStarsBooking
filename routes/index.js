const ShipController = require("../controllers/ship");
const UserController = require("../controllers/user");
const auth = require('../middleware/auth');
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

    server.get("/users/:id", auth, (req, res) => {
        UserController.get(req, res);
    });

    server.post("/users", (req, res) => {
        UserController.create(req, res);
    });

    server.post("/login", (req, res) => {
        UserController.login(req, res);
    });

    server.post('/users/:id', upload.single('avatar'), (req, res) => {
        UserController.changeAvatar(req, res);
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