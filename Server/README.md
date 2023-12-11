## \*\* WOOFER ROUTES

**USERS**

- POST /login
  This route requires a body with "email" and "password" to generate a token and send to the client

- POST /register
  This route will create a user in the users' table

- POST /googleLogin
- POST /activateAccount/:verificationToken
- POST /changePassword/:token

- GET /users/:id
  This route will return data for a user ID. In addition to the user data, it returns a walker object and an owner object.
  Response format:
  [ ...user data  
   "owner": { ...owner data + "dogs": [{...dog data }]},
  "walker": { ...walker data}
  ],

- GET /users?role=admin
  This route will return data for all users. Adding the role=admin query parameter will return data for all users, including soft deleted users.

- PUT /editUser
  This route will update a user.

**OWNERS**

- GET /owner/:id
  -This route will bring all the data of the owner "id".

- GET /owner/?province=
  -This route will bring all the owners, if province is provided it will bring all the owners from that province. Important: if province name is separated by a space, replace it with %20. Example: GET /owner/?province=buenos%20aires

- GET /owner/dog/:username
  This route will bring all the dogs of the owner "username".

- POST /owner
  This route will create a new owner, it will require a "userName" and dog properties (name, size, breed, age, img)


**WALKERS**

- GET /walker?is_available= & province=
  This route will bring all the active walkers. If is_available is provided, it will bring all the active walkers. If province is provided, it will bring all the active walkers from that province. Important: if province name is separated by a space, replace it with %20. Example: GET /walker?is_available=true&province=Buenos%20Aires

- GET /walker/available
  This route will bring all the available and active walkers.

- GET /walker/:id
  -This route will bring all the data of the walker "id".

- POST /walker
  This route will create a new walker, it will require a "userName" and walker properties (dog_capacity, dog_size, walk_duration).

- PUT /walker/:id
  This route will set the walker "id" to be available or not, requiring a body with the value "is_available" set to true or false as needed.


**WALK TYPES**
- GET /walkType
  This route will bring all walk types.

- GET /walkType/:id
  This route will bring all the data of the walk type "id".

- POST /walkType
  This route will create a new walk type, it will require a body with the characteristics of the walk type.

- PUT /walkType/:id
  This route will update a walk type.

- DELETE /walkType/:id
  This route will delete a walk type.

**WALKS**
- POST /walk/
  This route will create a new walk, it will require a body with the data of the walk: ownerId, walkerId, walkTypesId(can be an array of ids), dogs(can be a number of dogs or can be an array of dogs ids) , duration, totalPrice, paymentMethod.

- GET /walk/walker/:walkerId?date=
  This route will bring all walks from a walker. If date is provided, it will bring all walks taken after that date

- GET /walk/owner/:ownerId?date=
  This route will bring all walks from an owner. If date is provided, it will bring all walks taken after that date

- GET /walk/all?date=
  This route will bring all walks from an owner.  If date is provided, it will bring all walks taken after that date

**REVIEWS**
- POST /review/
  This route will create a new review, it will require a body with the data of the review: idWalk, type, score, description.

- GET /review/
  This route will bring all reviews.

- GET /review/:id
  This route will bring all the data of the review "id".

**PAYMENT**

- POST /payment
  This route will create a new payment.


**ACTIVATE (Soft DELETE)**
//users

- DELETE /activate/users/:id
  This route will deactivate the user.
- PUT /activate/users/:id
  This route will activate the user.

//owner

- DELETE /activate/owner/:id
  This route will deactivate the owner.
- PUT /activate/owner/:id
  This route will activate the owner.

//walker

- DELETE /activate/walker/:id
  This route will deactivate the walker.
- PUT /activate/walker/:id
  This route will activate the walker.
  
## **⚠️ IMPORTANTE**

npm install express dotenv axios jsonwebtoken bcrypt sequelize pg passport passport-jwt

npm install --save-dev nodemon

To start on development mode --> npm run start:dev

---

In case the following error pops up when sequelize syncing is set on 'alter: true': Error - cannot cast type enum_walkers_walk_duration[] to enum_walkers_walk_duration -->
check file /node_modules/sequelize/lib/dialects/postgres/query-generator.js and modify https://github.com/aristov/sequelize/commit/4aab2d6bb1ab96fbd8cc35983727fc8a4ce6a3fd
