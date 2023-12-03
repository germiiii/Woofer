const userSeeder = require("./seeders/users");
const seedWalkTypes = require("./seeders/walkTypes");
const seedWalkers = require("./seeders/walkers");
const seedOwners = require("./seeders/owners");

const seed = async (User, WalkType) => {
  console.log("Seeding database...");
  try {
    await seedWalkTypes(WalkType);
    await userSeeder(User);
    await seedWalkers(User, WalkType);
    await seedOwners(User);
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

module.exports = seed;
