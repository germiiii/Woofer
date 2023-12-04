## \*\* WOOFER ROUTES

**USERS**

- POST /login
  This route require a body with "email" and "password" to generate token and send to the client

- POST /register
  This route will create a user in the users table

- POST /googleLogin

- POST /changePassword

- GET /users/:id
  This route returns data for a user ID. In addition to the user data, it returns a walker object and an owner object.
  Response format:
  [ ...user data  
   "owner": { ...owner data + "dogs": [{...dog data }]},
  "walker": { ...walker data}
  ],

- GET /users?role=admin
  This route returns data for all users. Adding the role=admin query parameter will return data for all users, including soft deleted users.

**OWNERS**

- GET /owner/?province=
  -This route will bring all the owners, if province is provided it will bring all the owners from that province. Important: if province name is separated by a space, replace it with %20. Example: GET /owner/?province=buenos%20aires

- GET /owner/:id
  -This route will bring all the data of the owner "id".

- POST /owner
  This route will create a new owner, it will require a "userName" and dog properties (name, size, breed, age, img)

- POST /owner/dog
  -This route will will create new dogs for a owner. it will require a user "id" and dog properties (name, size, breed, age, img)

- GET /owner/dog/:username
  This route will bring all the dogs of the owner "username".

**WALKERS**

- GET /walker/?is_available= & province=
  This route will bring all the active walkers. If is_available is provided it will bring all the active walkers. If province is provided it will bring all the active walkers from that province. Important: if province name is separated by a space, replace it with %20. Example: GET /walker?is_available=true&province=Buenos%20Aires

- GET /walker/available
  This route will bring all the available and active walkers

- GET /walker/:id
  -This route will bring all the data of the walker "id".

- POST /walker
  This route will create a new walker, it will require a "userName" and walker properties (dog_capacity, dog_size, walk_duration)

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

**WALK TYPES**
- GET /walkType
  This route will bring all walk types

- POST /walkType
  This route will create a new walk type, it will require a body with the characteristics of the walk type

- PUT /walkType/:id
  This route will update a walk type

- DELETE /walkType/:id
  This route will delete a walk type

## **⚠️ IMPORTANTE**

npm install express dotenv axios jsonwebtoken bcrypt sequelize pg passport passport-jwt

npm install --save-dev nodemon

Para inicial en modo dev --> npm run start:dev

---

En caso de error: cannot cast type enum_walkers_walk_duration[] to enum_walkers_walk_duration cuando se sincroniza sequelize con alter: true-->
chequear el archivo /node_modules/sequelize/lib/dialects/postgres/query-generator.js y hacer la modificacion https://github.com/aristov/sequelize/commit/4aab2d6bb1ab96fbd8cc35983727fc8a4ce6a3fd
