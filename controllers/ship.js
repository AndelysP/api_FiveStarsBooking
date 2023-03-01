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
    },

    // create(req, res) {
    //     const ship = new ShipModel({
    //         name: req.body.name,
    //         description: req.body.description,
    //         premium_fond: req.body.premium_fond,
    //         entertainement: req.body.entertainement,
    //         equipment: {
    //             bathroom: req.body.options.bathroom,
    //             bedroom: req.body.options.bedroom,
    //             livingroom: req.body.options.livingroom
    //         },
    //         price: req.body.price,
    //         capacity: req.body.capacity
    //     });
    //     ship.save().then(() => {
    //         res.send({result: `Création du vaisseau ${ship.name}`});
    //     });
    // }
}