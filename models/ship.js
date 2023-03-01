const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShipSchema = new Schema({
    name: String,
    description: String,
    premium_fond: Boolean,
    entertainement: Boolean,
    equipment: {
        bathroom: Number,
        bedroom: Number,
        livingroom: Number
    },
    price: Number,
    capacity: Number
});

const ShipModel = mongoose.model("ships", ShipSchema);

module.exports = ShipModel;