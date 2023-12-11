require("dotenv").config();
const { PORT } = process.env;
const server = require("./app.js");
const { conn, User, WalkType, Walk, Review, Notification } = require("./Database/db.js");
const bcrypt = require("bcrypt");
const seed = require("./Database/seed.js");

// Syncing all the models at once.
// force:true - ELIMINA TODAS LAS TABLAS DE LA BDD, Y LAS VUELVE A CREAR EN BASE A LOS MODELOS
// alter:true - ACTUALIZA LAS TABLAS DE BDD EN BASE A LOS MODELOS

const syncOptions = {
  force: true, //alter: true or force: true
};

try {
  conn
    .sync(syncOptions)
    .then(() => {
      server.listen(PORT, () => {
        console.log("Server raised int port: " + PORT); // eslint-disable-line no-console
      });
    })
    .then(() => {
      const shouldRunSeeder = syncOptions.force === true;
      if (shouldRunSeeder) {
        seed(User, WalkType, Walk, Review, Notification);
      }
    });
} catch (error) {
  console.log("An error occurred during the server startup: " + error.message);
}
