const ShipController = require("../controllers/ship");

module.exports = server => {
    server.get("/ships", (req, res) => {
        ShipController.getAll(req, res);
    });

    server.get("/ships/:id", (req, res) => {
        ShipController.get(req, res);
    });

    // server.post("/ships", (req, res) => {
    //     ShipController.create(req, res);
    // });

    // server.delete("/ships/:id", (req, res) => {
    //     ShipController.delete(req, res);
    // })
}