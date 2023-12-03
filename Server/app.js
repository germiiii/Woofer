const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./Routes/index.js");
const mercadopago = require('mercadopago'); //!

//* const passport = require('./Routes/Middlewares/passport.js');
const { FRONTEND } = process.env;

require("./Database/db.js");

const server = express();
server.use(express.json());//!
server.use(cors());//!

server.name = "API";

//* server.use(passport.initialize());
server.use(cors());

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin", "*"
    `${FRONTEND || "https://woofer-taupe.vercel.app"}`
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


//!Mercadopago

// const { MercadoPagoConfig, Preference } = require('mercadopago');
// const accessToken = 'TEST-5466072518364478-111710-958d4575644352b88caad9750f6b548e-272949259';
// const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });

// //! DB
// const Walktypes = [
//   {
//     id: 1,
//     title: "15 minute Premium dog walk",
//     price: 30,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will devote their full attention to walk your furry companion privately for 15 minutes.",
//     ],
//   },
//   {
//     id: 2,
//     title: "30 minute Premium dog walk",
//     price: 35,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will devote their full attention to walk your furry companion privately for 30 minutes.",
//     ],
//   },
//   {
//     id: 3,
//     title: "60 minute Premium dog walk",
//     price: 45,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will devote their full attention to walk your furry companion privately for 60 minutes.",
//     ],
//   },
//   {
//     id: 4,
//     title: "15 minute dog walk for small groups",
//     price: 20,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for a brief 15 minute work out with three to five other dog friends.",
//     ],
//   },
//   {
//     id: 5,
//     title: "30 minute dog walk for small groups",
//     price: 25,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for a nice 30 minute work out with three to five other dog friends.",
//     ],
//   },
//   {
//     id: 6,
//     title: "60 minute dog walk for small groups",
//     price: 35,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for an intense 60 minute work out with three to five other dog friends.",
//     ],
//   },
//   {
//     id: 7,
//     title: "15 minute dog walk for big groups",
//     price: 15,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for a brief 15 minute work out with five dog friends, or more.",
//     ],
//   },
//   {
//     id: 8,
//     title: "30 minute dog walk for big groups",
//     price: 20,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for a nice 30 minute work out with five dog friends, or more.",
//     ],
//   },
//   {
//     id: 9,
//     title: "60 minute dog walk for big groups",
//     price: 30,
//     currency_id: 'USD', 
//     description: [
//       "Woofers will take your furry companion for an intense 60 minute work out with five dog friends, or more.",
//     ],
//   },
// ];

// const items = Walktypes.map(walkType => ({
//   title: walkType.title,
//   description: walkType.description, 
//   quantity: 1,
//   unit_price: walkType.price,
//   currency_id: walkType.currency_id, 
// }));

// const preference = new Preference(client);

// preference.create({
//   body: {
//     items,
//   }
// }).then(console.log).catch(console.log);




module.exports = server;
