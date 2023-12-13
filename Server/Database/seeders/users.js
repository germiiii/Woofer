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

const userData = [
  {
    name: "Julia",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "janesmith",
    address: "456 Oak St",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "f1.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,  
    selectedType: "walker",
  },
  {
    name: "Ana",
    lastName: "Muhall",
    email: "ana.muhall@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "anamuhall",
    address: "Av. Corrientes 1234",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "f2.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },
  {
    name: "Lucía",
    lastName: "González",
    email: "lucia.gonzalez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "luciagonzalez",
    address: "Av. Callao 6789",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "f3.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Martín",
    lastName: "Manrique",
    email: "martin.Manrique@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "martinmanrique",
    address: "Av. Rivadavia 3456",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "m1.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Sofía",
    lastName: "Lugat",
    email: "sofia.lugat@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "sofialugat",
    address: "Av. Cabildo 9012",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "f4.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Juan",
    lastName: "Lopez",
    email: "juan.lopez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "juanlopez",
    address: "Av. Santa Fe 5678",
    city: "Buenos Aires",
    province: "Buenos Aires",
    image: "m2.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },
  {
    name: "Juan",
    lastName: "Perez",
    email: "johndoe@example.com",
    password: "password123",
    username: "johndoe",
    address: "Sarmiento 651",
    city: "Ingeniero Jacobacci",
    province: "Rio Negro",
    image: "m3.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },
  {
    name: "Carlos",
    lastName: "González",
    email: "carlos.gonzalez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "carlosgonzalez",
    address: "Calle 9 de Julio 123",
    city: "Córdoba",
    province: "Córdoba",
    image: "m4.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },
  {
    name: "Ana",
    lastName: "Pérez",
    email: "ana.perez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "anaperez",
    address: "Calle San Martín 456",
    city: "Mendoza",
    province: "Mendoza",
    image: "f6.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Juan",
    lastName: "García",
    email: "juan.garcia@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "juangarcia",
    address: "Calle Belgrano 789",
    city: "Salta",
    province: "Salta",
    image: "m5.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: false,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Sofía",
    lastName: "Rodríguez",
    email: "sofia.rodriguez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "sofiarodriguez",
    address: "Calle San Luis 1011",
    city: "San Luis",
    province: "San Luis",
    image: "f7.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Martín",
    lastName: "Fernández",
    email: "martin.fernandez@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "martinfernandez",
    address: "Calle San Juan 1212",
    city: "Tucumán",
    province: "Tucumán",
    image: "m6.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },

  {
    name: "Emma",
    lastName: "Johnson",
    email: "emma.johnson@gmail.com",
    password: "$2b$10$jBChsBNbIOCSWQC9gbHx1.aFLIAwpSggtpbaO4CPg1nhG39EAz5Xm",
    username: "emmajohnson",
    address: "123 Main Street",
    city: "San Francisco",
    province: "Estados Unidos",
    image: "f8.jpg",
    location: null,
    isWalker: false,
    isOwner: false,
    is_active: true,
    score: 0,
    selectedType: "walker",
  },
];

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
    });

    console.log("- ADMIN user (admin@woofer.com) successfully created");
  } catch (error) {
    console.log("Error creating ADMIN user:", error);
  }
  try {
    await Promise.all(
      userData.map(async (user) => {
        const imagePath = path.join(__dirname, "./userImages", user.image);
        const uploadedImage = await cloudinary.uploader.upload(imagePath);
        user.image = uploadedImage.secure_url;
        await User.create(user);
      })
    );

    console.log("- Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;
