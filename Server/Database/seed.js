const userSeeder = require("./seeders/users");
const seedWalkTypes = require("./seeders/walkTypes");
const seedWalkers = require("./seeders/walkers");
const seedOwners = require("./seeders/owners");
const seedWalkAndReviews = require("./seeders/walkAndReviews");
const seed = async () => {
  console.log("Seeding database...");
  try {
    await userSeeder();
    await seedWalkTypes();
    await seedWalkers( );
    await seedOwners();
    await seedWalkAndReviews();
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

module.exports = seed;
