const { User } = require("../db");
const ownersData = require("./ownersData.js");
const fs = require("fs");
const path = require("path");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const seedOwners = async () => {
  try {
    console.log("SEEDING OWNERS...");

    for (const [index, owner] of ownersData.entries()) {
      const { username, dogs, ...ownerAttributes } = owner;
      const user = await User.findOne({ where: { username } });

      if (user) {
        ownerAttributes.dog_count = dogs.length;
        const createdOwner = await user.createOwner(ownerAttributes);

        user.isOwner = true;
        user.selectedType = "owner";
        await user.save();

        if (dogs && Array.isArray(dogs)) {
          await Promise.all(
            dogs.map(async (dog) => {
              const { img, ...dogAttributes } = dog;
              const imagePath = path.join(__dirname, "./dogImages", img);
              const uploadedImage = await cloudinary.uploader.upload(imagePath);
              dogAttributes.img = uploadedImage.secure_url;
              await createdOwner.createDog(dogAttributes);
            })
          );
        }

        console.log(`${index}) ${user.email} (Dogs: ${ownerAttributes.dog_count})`);
      } else {
        console.error(`User with username ${username} not found`);
      }
    }

    console.log("- Owners seeded successfully\n");
  } catch (error) {
    console.error("Error seeding owners:", error);
  }
};

module.exports = seedOwners;
