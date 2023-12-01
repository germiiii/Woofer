## ** WOOFER ROUTES

**USERS**
- POST /login
    This route require a body with "email" and "password" to generate token and send to the client

- POST /register 
    This route will create a user in the users table

- POST /googleLogin

- POST /changePassword

- GET /users/:id
    This route returns data for a user ID.

- GET /users
    This route returns data for all users

**OWNERS**
- POST /owner
    This route will create a new owner, it will require a "userName" and an array of objects with the dogs properties (name, size, breed, age, img)
- GET /owner/all
    -This route will bring all the owners
- POST /owner/dog
    -This route will will create new dogs for a owner. it will require a "userName" and an array of objects with the dogs properties (name, size, breed, age, img)
- GET /owner/dog/:username
    This route will bring all the dogs of the owner "username".

**WALKERS**
- POST /walker
    This route will create a new walker, it will require a "userName" and walker properties (dog_capacity, dog_size, walk_duration)
- GET /walker/all walker
    This route will bring all the active walkers
- GET /walker/available
    This route will bring all the available and active walkers
- PUT /walker/:id
    This route will set the walker "id" to be available or not, requiring a body with the value "is_available" set to true or false as needed.


**ACTIVATE (Soft DELETE)**
//users
- DELETE /activate/users/:id
    This route will desactivate the user
- PUT /activate/users/:id 
    This route will activate the user

//owner
- DELETE /activate/owner/:id
    This route will desactivate the owner
- PUT /activate/owner/:id
    This route will activate the owner 

//walker
- DELETE /activate/walker/:id
    This route will desactivate the walker
- PUT /activate/walker/:id
    This route will activate the walker


## **⚠️ IMPORTANTE**

npm install express dotenv axios jsonwebtoken bcrypt sequelize pg passport passport-jwt

npm install --save-dev nodemon

Para inicial en modo dev --> npm run start:dev

--------------------------------------------------------------
En caso de error: cannot cast type enum_walkers_walk_duration[] to enum_walkers_walk_duration cuando se sincroniza sequelize con alter: true-->
chequear el archivo /node_modules/sequelize/lib/dialects/postgres/query-generator.js y hacer la modificacion https://github.com/aristov/sequelize/commit/4aab2d6bb1ab96fbd8cc35983727fc8a4ce6a3fd