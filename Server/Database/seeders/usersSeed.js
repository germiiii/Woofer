const { User } = require("../db");
const usersData = require('./usersData');

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

const seedUsers = async () => {
  try {
    //  agrego un admin por defecto
    const imagePath = path.join(__dirname, "./userImages", "woofer.png");
    const uploadedImage = await cloudinary.uploader.upload(imagePath);
    User.create({
      name: "ADMIN",
      lastName: "",
      email: "admin@woofer.com",
      password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
      username: "admin",
      address: "",
      province: "",
      role: "admin",
      image: uploadedImage.secure_url,
      selectedType: "walker",
      is_active: true,
    });

    console.log("- ADMIN user (admin@woofer.com) successfully created");
  } catch (error) {
    console.log("Error creating ADMIN user:", error);
  }
  try {
    await Promise.all(
      usersData.map(async (user) => {
        const imagePath = path.join(__dirname, "./userImages", user.image);
        const uploadedImage = await cloudinary.uploader.upload(imagePath);
        user.image = uploadedImage.secure_url;
        await User.create(user);
        console.log(user.email);
      })
    );

    console.log("- Users seeded successfully\n");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;
