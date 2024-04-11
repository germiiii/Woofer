require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgresql://wooferdb_owner:jK1leiEa5BYH@ep-divine-credit-a5g19q0p.us-east-2.aws.neon.tech/wooferdb?sslmode=require`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Database connection has been established successfully." +
        `${DB_USER}:password@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
  })
  .catch((error) => {
    console.error(
      "Unable to connect to the database:" +
        `${DB_USER}:password@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
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

const { User, Owner, Dog, Walker, Walk, WalkType, Review, Notification } = sequelize.models;

//relacion de herencia de user a owner y walker
User.hasOne(Owner);
User.hasOne(Walker);
Owner.belongsTo(User);
Walker.belongsTo(User);

//relaciones owner con dog
Owner.hasMany(Dog);
Dog.belongsTo(Owner);

//relaciones walker con los tipos de paseo que hace
Walker.belongsToMany(WalkType, { through: "walkerWalkType" });
WalkType.belongsToMany(Walker, { through: "walkerWalkType" });

//RELACIONES DE PASEO
//relaciones de walk con owner y walker
Owner.belongsToMany(Walker, { through: { model: Walk, unique: false } });
Walker.belongsToMany(Owner, { through: { model: Walk, unique: false } });

//relaciones walk con owner y walker
Owner.hasMany(Walk);
Walker.hasMany(Walk);
Walk.belongsTo(Owner);
Walk.belongsTo(Walker);

//relacion para detallar cada perro que hace el paseo
Dog.belongsToMany(Walk, { through: "dogWalk" });
Walk.belongsToMany(Dog, { through: "dogWalk" });

//relacion para detallar cada tipo de paseo de wall
WalkType.belongsToMany(Walk, { through: "walkTypeWalk" });
Walk.belongsToMany(WalkType, { through: "walkTypeWalk" });


//relaciones entre paseo y review
Walk.hasMany(Review);
Review.belongsTo(Walk);

//relaciones entre user y notificacion
User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
