'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (models) => {
    let password = "admin123";
    let salt = bcrypt.genSaltSync(10);
    const hashed_pass = bcrypt.hashSync(password, salt);

    // Check if user already exists
    const existingUser = await models.users.findOne({ email: "admin@gmail.com" });
    if (!existingUser) {
      const result = await models.users.insertMany([{
        "name": "admin",
        "email": "admin@gmail.com",
        "password": hashed_pass,
        "user_type": "670decb86e0d8b14334c537d" // Make sure this user_type exists
      }]);

      console.log(`Inserted ${result.insertedCount} user(s)`);
    } else {
      console.log('User already exists, skipping insert.');
    }
  },

  down: async (models) => {
    const result = await models.users.deleteMany({
      email: "admin@gmail.com" // Change to a unique field for safer deletion
    });

    console.log(`Deleted ${result.deletedCount} user(s)`);
  }
};
