const walkerData = [
  {
    username: "janesmith",
    dog_capacity: 1,
    walk_duration: ["60"],
    dog_size: ["medium"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "Con experiencia previa en el cuidado de perros y un profundo respeto por su bienestar, puedo garantizar paseos divertidos y seguros para sus amigos de cuatro patas. Estoy disponible para adaptarme a sus horarios y necesidades específicas. ¡Permítanme cuidar de sus peludos mientras ustedes cumplen con sus compromisos diarios!",
  },
  {
    username: "martinmanrique",
    dog_capacity: 5,
    walk_duration: ["30"],
    dog_size: ["small", "medium"],
    is_available: false,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "¡Hola comunidad amante de los peludos! 👋 Soy un entusiasta de los animales con un amor especial por los perros. Estoy emocionado/a por ofrecer mis servicios de paseo de perros a quienes necesiten una mano extra para asegurarse de que sus adorables compañeros peludos estén felices y saludables.",
  },

  {
    username: "sofialugat",
    dog_capacity: 8,
    walk_duration: ["15"],
    dog_size: ["small"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "Are you looking for a reliable and friendly dog walker? Look no further! With years of experience caring for dogs, I can assure you that your dog will be in good hands. Call me today to schedule a walk!",
  },

  {
    username: "carlosgonzalez",
    dog_capacity: 4,
    walk_duration: ["60"],
    dog_size: ["medium"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "Do you need help taking care of your dog? I’m here to help! As a dog walker, I can assure you that your dog will receive the exercise and attention they need. Call me today to schedule a walk!",
  },

  {
    username: "anaperez",
    dog_capacity: 4,
    walk_duration: ["30"],
    dog_size: ["medium"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "Are you tired of worrying about your dog’s exercise? Don’t worry anymore! As a dog walker, I can help keep your dog active and healthy. Contact me today to schedule a walk!",
  },

  {
    username: "sofiarodriguez",
    dog_capacity: 10,
    walk_duration: ["60"],
    dog_size: ["small", "medium"],
    is_available: true,
    schedule_availability: "",
    is_active: false,
    sale_details:
      "Are you looking for a dog walker who can take care of your dog? Look no further! As a dog walker, I can help keep your dog healthy and happy. Contact me today to schedule a walk!",
  },

  {
    username: "martinfernandez",
    dog_capacity: 1,
    walk_duration: ["15"],
    dog_size: ["medium"],
    is_available: true,
    schedule_availability: "",
    is_active: false,
    sale_details:
      "Does your dog need more exercise? Look no further! As a dog walker, I can help keep your dog active and healthy. Call me today to schedule a walk!",
  },
  {
    username: "emmajohnson",
    dog_capacity: 3,
    walk_duration: ["60"],
    dog_size: ["small", "medium"],
    is_available: true,
    schedule_availability: "",
    is_active: true,
    sale_details:
      "Are you looking for a reliable and friendly dog walker? Look no further! With years of experience caring for dogs, I can assure you that your dog will be in good hands. Contact me today to schedule a walk!",
  },
];

const seedWalkers = async (User, WalkType) => {
  try {
    for (const walker of walkerData) {
      const { username, ...walkerAttributes } = walker;
      const user = await User.findOne({ where: { username } });

      if (user) {
        const createdWalker = await user.createWalker(walkerAttributes);
        user.isWalker = true;
        user.selectedType = "walker";
        await user.save(); // Save the updated user
        for (const duration of walkerAttributes.walk_duration) {
          const walkType = await WalkType.findAll({
            where: { walk_duration: duration },
          });
          await createdWalker.addWalkType(walkType);
        }

        let capacityType = "";
        if (
          walkerAttributes.dog_capacity > 0 &&
          walkerAttributes.dog_capacity <= 3
        ) {
          capacityType = "low";
        } else if (
          walkerAttributes.dog_capacity > 3 &&
          walkerAttributes.dog_capacity <= 6
        ) {
          capacityType = "medium";
        } else if (walkerAttributes.dog_capacity > 6) {
          capacityType = "high";
        }

        const capacityWalkType = await WalkType.findAll({
          where: { dog_capacity: capacityType },
        });

        if (createdWalker.WalkTypes) {
          // Add null check for WalkTypes property
          const newWalkTypes = capacityWalkType.filter(
            (type) => !createdWalker.WalkTypes.includes(type)
          );
          await createdWalker.addWalkType(newWalkTypes);
        } else {
          await createdWalker.setWalkTypes(capacityWalkType); // If WalkTypes property is undefined, set it with capacityWalkType
        }
      } else {
        console.error(`User with username ${username} not found`);
      }
    }

    console.log("- Walkers seeded successfully");
  } catch (error) {
    console.error("Error seeding walkers:", error);
  }
};

module.exports = seedWalkers;
