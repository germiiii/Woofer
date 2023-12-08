const userSeeder = require("./seeders/users");
const seedWalkTypes = require("./seeders/walkTypes");
const seedWalkers = require("./seeders/walkers");
const seedOwners = require("./seeders/owners");
const seedWalkAndReviews = require("./seeders/walkAndReviews");
const seed = async (User, WalkType, Walk, Review) => {
  console.log("Seeding database...");
  try {
    await userSeeder(User);
    await seedWalkTypes(WalkType);
    await seedWalkers(User, WalkType);
    await seedOwners(User);
    await seedWalkAndReviews(User, Walk, Review);
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

module.exports = seed;
