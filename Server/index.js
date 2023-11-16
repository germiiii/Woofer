require("dotenv").config();
const { PORT } = process.env;
const server = require("./app.js");
const { conn, User } = require("./Database/db.js");
const bcrypt = require("bcrypt");

// Syncing all the models at once.
// force:true - ELIMINA TODAS LAS TABLAS DE LA BDD, Y LAS VUELVE A CREAR EN BASE A LOS MODELOS
// alter:true - ACTUALIZA LAS TABLAS DE BDD EN BASE A LOS MODELOS
try {
  conn
    .sync({ force: false })
    .then(() => {
      server.listen(PORT, () => {
        console.log("Server raised int port: " + PORT); // eslint-disable-line no-console
      });
    })
   
} catch (error) {
  console.log("An error occurred during the server startup: " + error.message);
}
