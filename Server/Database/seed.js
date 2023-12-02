const userSeeder = require("./seeders/users");
const seedWalkTypes = require("./seeders/walkTypes");
const seedWalkers = require("./seeders/walkers");
const seedOwners = require("./seeders/owners");

const seed = async (User, WalkType ) => {
  console.log(`Wait while seeding database...`);
  await userSeeder(User);
  await seedWalkers(User);
  await seedOwners(User);
  await seedWalkTypes(WalkType);
};

module.exports = seed;