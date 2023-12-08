require("dotenv").config();
const { PORT } = process.env;
const server = require("./app.js");
const { conn, User, WalkType, Walk, Review } = require("./Database/db.js");
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
        // try {
        //   //  agrego un admin por defecto
        //   User.create({
        //     name: "ADMIN",
        //     lastName: "",
        //     email: "admin@admin.com",
        //     password:
        //       "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
        //     username: "admin",
        //     address: "",
        //     province: "",
        //     role: "admin",
        //   });
        //   console.log("- ADMIN user successfully created");
        // } catch (error) {
        //   console.log("Error creating ADMIN user:", error);
        // }
        // Call the seed function
        seed(User, WalkType, Walk, Review);
      }
    });
} catch (error) {
  console.log("An error occurred during the server startup: " + error.message);
}
