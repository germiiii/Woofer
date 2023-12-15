const { User, WalkType } = require("../db");
const walkersData = require('./walkersData.js');


const seedWalkers = async () => {
  try {
    console.log("SEEDING WALKERS...");
    for (const [index, walker] of walkersData.entries()) {
      const { username, ...walkerAttributes } = walker;
      const user = await User.findOne({ where: { username } });

      if (user) {
        const createdWalker = await user.createWalker(walkerAttributes);
        user.isWalker = true;
        user.selectedType = "walker";
        await user.save();

        for (const duration of walkerAttributes.walk_duration) {
          const walkType = await WalkType.findAll({
            where: { walk_duration: duration },
          });
          await createdWalker.addWalkType(walkType);
        }

        let capacityType = "";
        if (walkerAttributes.dog_capacity > 0 && walkerAttributes.dog_capacity <= 3) {
          capacityType = "low";
        } else if (walkerAttributes.dog_capacity > 3 && walkerAttributes.dog_capacity <= 6) {
          capacityType = "medium";
        } else if (walkerAttributes.dog_capacity > 6) {
          capacityType = "high";
        }

        const capacityWalkType = await WalkType.findAll({
          where: { dog_capacity: capacityType },
        });

        if (createdWalker.WalkTypes) {
          const newWalkTypes = capacityWalkType.filter(
            (type) => !createdWalker.WalkTypes.includes(type)
          );
          await createdWalker.addWalkType(newWalkTypes);
        } else {
          await createdWalker.setWalkTypes(capacityWalkType);
        }
        console.log(`${index}) ${user.email}`);
      } else {
        console.error(`User with username ${username} not found`);
      }
    }

    console.log("- Walkers seeded successfully\n");
  } catch (error) {
    console.error("Error seeding walkers:", error);
  }
};

module.exports = seedWalkers;
