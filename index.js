const express = require("express"); // chargement d'express
const server = express(); // création du serveur
const mongoose = require("mongoose") // chargement de mongoDB 
const routes = require("./routes"); // chargement des routes
const cors = require('cors'); // chargement de cors 
require('dotenv').config()

server.use(cors());
server.use(express.json());
server.use('/uploads', express.static('uploads'));
routes(server);

server.listen(5500, () => {
    console.log("Serveur lancé et à l'écoute sur le port 5500");

    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/spaceships");

    mongoose.connection
        .once("open", () => console.log("Connexion à la base de données Spaceships ok"))
        .on("error", error => console.error("Problème durant la connexion à la base mongo", error));
});

