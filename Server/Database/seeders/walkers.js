const walkerData = [
  {
    username: "janesmith",
    dog_capacity: 2,
    walk_duration: ["30", "60"],
    dog_size: ["medium", "large"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
  },
  {
    username: "martinmanrique",
    dog_capacity: 5,
    walk_duration: ["15", "30", "60"],
    dog_size: ["small", "medium", "large"],
    is_available: false,
    schedule_availability: "",
    is_active: true,
  },

  {
    username: "sofialugat",
    dog_capacity: 8,
    walk_duration: ["15", "30", "60"],
    dog_size: ["small"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
  },

  {
    username: "carlosgonzalez",
    dog_capacity: 4,
    walk_duration: ["60"],
    dog_size: ["large"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
  },

  {
    username: "anaperez",
    dog_capacity: 4,
    walk_duration: ["60"],
    dog_size: ["medium"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
  },

  {
    username: "sofiarodriguez",
    dog_capacity: 4,
    walk_duration: ["60"],
    dog_size: ["small", "medium"],
    is_available: true,
    schedule_availability: "",
    is_active: false,
  },

  {
    username: "martinfernandez",
    dog_capacity: 1,
    walk_duration: ["60"],
    dog_size: ["large"],
    is_available: true,
    schedule_availability: "",
    is_active: false,
  },
  {
    username: "emmajohnson",
    dog_capacity: 3,
    walk_duration: ["60"],
    dog_size: ["large"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
  },
];

const seedWalkers = async (User) => {
  try {
    for (const walker of walkerData) {
      const { username, ...walkerAttributes } = walker;
      const user = await User.findOne({ where: { username } });
      if (user) {
        await user.createWalker(walkerAttributes);
        user.isWalker = true; // Set the isWalker property to true
        await user.save(); // Save the updated user
        // console.log(`Walker created for user with username ${username}`);
      } else {
        console.error(`User with username ${username} not found`);
      }
    }
    console.log(`- Walkers seeded successfully`);
  } catch (error) {
    console.error("Error seeding walkers:", error);
  }
};

module.exports = seedWalkers;
