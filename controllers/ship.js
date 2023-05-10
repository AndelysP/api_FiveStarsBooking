const ShipModel = require("../models/ship");

module.exports = {
    getAll(req, res) {
        ShipModel.find().then(ships => {
            res.send(ships);
        });
    },

    get(req, res) {
        const id = req.params.id;
        ShipModel.findById(id).then(ship => {
            res.send(ship);
        });
    }
}