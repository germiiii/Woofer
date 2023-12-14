const userSeeder = require("./seeders/usersSeed");
const seedWalkTypes = require("./seeders/walkTypes");
const seedWalkers = require("./seeders/walkersSeed");
const seedOwners = require("./seeders/ownersSeed");
const seedWalkAndReviews = require("./seeders/walkAndReviewsSeed");
const seed = async () => {
  console.log("\nSeeding database...\n");
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
