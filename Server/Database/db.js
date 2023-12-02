require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const seed = require("./seed.js");

////postgres://fl0user:KdQaqVxu9h1N@ep-polished-haze-56223027.us-east-2.aws.neon.fl0.io:5432/pokemon?sslmode=require
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
//   // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
//   {
//     dialectOptions: {
//       ssl: {
//         require: true, //habilitar certificado de seguridad
//         rejectUnauthorized: false, //para evitar errores de certificado
//       },
//     },
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

//// servidor local
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Database connection has been established successfully." +
        `${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
  })
  .catch((error) => {
    console.error(
      "Unable to connect to the database:" +
        `${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      error
    );
  });

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Owner, Dog, Walker, Walk, WalkType } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasOne(Owner);
Owner.belongsTo(User);

User.hasOne(Walker);
Walker.belongsTo(User);

Owner.hasMany(Dog);
Dog.belongsTo(Owner);

Owner.belongsToMany(Walker, { through: { model: Walk, unique: false } });
Walker.belongsToMany(Owner, { through: { model: Walk, unique: false } });

Dog.belongsToMany(Walk, { through: "dogWalk" });
Walk.belongsToMany(Dog, { through: "dogWalk" });

Owner.hasMany(Walk);
Walk.belongsTo(Owner);

Walker.hasMany(Walk);
Walk.belongsTo(Walker);

try {
  //  agrego un admin por defecto
  User.create({
    name: "ADMIN",
    lastName: "",
    email: "admin@admin.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "admin",
    address: "",
    province: "",
    role: "admin",
  });
  console.log("ADMIN user successfully created");
} catch (error) {}

// Call the seed function
seed(User, WalkType)
  .then(() => {
    console.log("Seeding completed successfully");
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
  });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
