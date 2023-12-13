const { User } = require("../../Database/db");

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

const ownerData = [
  {
    username: "anamuhall",
    is_active: true,
    dogs: [
      {
        name: "Max",
        breed: "Labrador",
        age: 3,
        img: "labrador1.jpg",
        size: "medium",
        is_active: true,
      },
      {
        name: "Bella",
        breed: "Golden",
        age: 2,
        img: "golden1.jpg",
        size: "medium",
        is_active: true,
      },
    ],
  },
  {
    username: "luciagonzalez",
    is_active: true,
    dogs: [
      {
        name: "Coco",
        breed: "Labrador",
        age: 3,
        img: "labrador2.jpg",
        size: "large",
        is_active: true,
      },
      {
        name: "Pulga",
        breed: "Poodle",
        age: 2,
        img: "Poodle1.jpg",
        size: "small",
        is_active: true,
      },
      {
        name: "Charlie",
        breed: "Bulldog",
        age: 4,
        img: "Poodle1.jpg",
        size: "medium",
        is_active: true,
      },
    ],
  },
  {
    username: "juanlopez",
    is_active: true,
    dogs: [
      {
        name: "Daisy",
        breed: "Beagle",
        age: 1,
        img: "Beagle1.jpg",
        size: "small",
        is_active: true,
      },
    ],
  },
  {
    username: "johndoe",
    is_active: true,
    dogs: [
      {
        name: "Rocky",
        breed: "Boxer",
        age: 3,
        img: "Boxer1.jpg",
        size: "large",
        is_active: true,
      },
    ],
  },
  {
    username: "juangarcia",
    is_active: true,
    dogs: [
      {
        name: "Luna",
        breed: "Boxer",
        age: 4,
        img: "Boxer1.jpg",
        size: "large",
        is_active: true,
      },
      {
        name: "Zeus",
        breed: "Rottweiler",
        age: 4,
        img: "Rottweiler1.jpg",
        size: "large",
        is_active: true,
      },
      {
        name: "Coco",
        breed: "Chihuahua",
        age: 7,
        img: "Chihuahua1.jpg",
        size: "small",
        is_active: true,
      },
      {
        name: "Ginger",
        breed: "Boxer",
        age: 4,
        img: "Boxer1.jpg",
        size: "large",
        is_active: true,
      },
    ],
  },
  // {
  //   username: "emmajohnson",
  //   is_active: true,
  //   dogs: [
  //     {
  //       name: "Shadow",
  //       breed: "Chihuahua",
  //       age: 1,
  //       img: "Chihuahua2.jpg",
  //       size: "small",
  //       is_active: true,
  //     },
  //   ],
  // },
  // {
  //   username: "carlosgonzalez",
  //   is_active: true,
  //   dogs: [
  //     {
  //       name: "Shadow",
  //       breed: "Chihuahua",
  //       age: 1,
  //       img: "Chihuahua3.jpg",
  //       size: "small",
  //       is_active: true,
  //     },
  //   ],
  // },
];

const seedOwners = async () => {
  try {
    for (const owner of ownerData) {
      const { username, dogs, ...ownerAttributes } = owner;
      const user = await User.findOne({ where: { username } });
      if (user) {
        ownerAttributes.dog_count = dogs.length;
        const createdOwner = await user.createOwner(ownerAttributes);
        // console.log(`Owner created for user with username ${username}`);
        user.isOwner = true; // Set the isOwner property to true
        user.selectedType = "owner";    
        
        await user.save(); // Save the updated user
        
        // console.log(`isOwner property set to true for user with username ${username}`);
        if (dogs && Array.isArray(dogs)) {
          await Promise.all(
            dogs.map(async (dog) => {
              const { img, ...dogAttributes } = dog;
              const imagePath = path.join(__dirname, "./dogImages", img);
              const uploadedImage = await cloudinary.uploader.upload(imagePath);
              dogAttributes.img = uploadedImage.secure_url;
              const createdDog = await createdOwner.createDog(dogAttributes);
              // console.log(`Dog created for owner with username ${username}`);
            })
          );
        }
      } else {
        console.error(`User with username ${username} not found`);
      }
    }
    console.log(`- Owners seeded successfully`);
  } catch (error) {
    console.error("Error seeding owners:", error);
  }
};

module.exports = seedOwners;
