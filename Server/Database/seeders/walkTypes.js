const walkTypeData = [
  {
    title: "15 minute Premium dog walk",
    price: 30,
    description:
      "Woofers will devote their full atention to walk your furry companion privately for 15 minutes.",
    dog_capacity: "low",
    walk_duration: "15",
    dog_size: "small",
    walk_type: "premium",
  },

  {
    title: "30 minute Premium dog walk",
    price: 35,
    description:
      "Woofers will devote their full atention to walk your furry companion privately for 30 minutes.",
    dog_capacity: "low",
    walk_duration: "30",
    dog_size: "small",
    walk_type: "premium",
  },
  {
    title: "60 minute Premium dog walk",
    price: 45,
    description:
      "Woofers will devote their full atention to walk your furry companion privately for 15 minutes.",
    dog_capacity: "low",
    walk_duration: "60",
    dog_size: "small",
    walk_type: "premium",
  },
  {
    title: "15 minute dog walk for small groups",
    price: 20,
    description:
      "Woofers will take your furry companion for a brief 15 minute work out with three to five other dog friends.",
    dog_capacity: "medium",
    walk_duration: "15",
    dog_size: "small",
    walk_type: "normal",
  },
  {
    title: "30 minute dog walk for small groups",
    price: 25,
    description:
      "Woofers will take your furry companion for a nice 30 minute work out with three to five other dog friends.",
    dog_capacity: "medium",
    walk_duration: "30",
    dog_size: "small",
    walk_type: "normal",
  },
  {
    title: "60 minute dog walk for small groups",
    price: 35,
    description:
      "Woofers will take your furry companion for an intense 60 minute work out with three to five other dog friends.",
    dog_capacity: "medium",
    walk_duration: "60",
    dog_size: "small",
    walk_type: "normal",
  },
  {
    title: "15 minute dog walk for big groups",
    price: 15,
    description:
      "Woofers will take your furry companion for an brief 15 minute work out with five dog friends, or more.",
    dog_capacity: "high",
    walk_duration: "15",
    dog_size: "small",
    walk_type: "normal",
  },
  {
    title: "30 minute dog walk for big groups",
    price: 20,
    description:
      "Woofers will take your furry companion for an nice 30 minute work out with five dog friends, or more.",
    dog_capacity: "high",
    walk_duration: "30",
    dog_size: "small",
    walk_type: "normal",
  },
  {
    title: "60 minute dog walk for big groups",
    price: 30,
    description:
      "Woofers will take your furry companion for an intense 60 minute work out with five dog friends, or more.",
    dog_capacity: "high",
    walk_duration: "60",
    dog_size: "small",
    walk_type: "normal",
  },
];

const seedWalkTypes = async (WalkType) => {
  try {
    await WalkType.bulkCreate(walkTypeData);
    console.log("- WalkTypes seeded successfully");
  } catch (error) {
    console.error("Error seeding WalkTypes:", error);
  }
};

module.exports = seedWalkTypes;
