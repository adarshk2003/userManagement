'use strict';
const bcrypt=require('bcrypt');
const user_types = require('../models/user_types');
module.exports = {
  up: (models, mongoose) => {
    let password = "admin@123";
    let salt = bcrypt.genSaltSync(10);
    let hashed_pass = bcrypt.hashSync(password, salt);

    return models.users.insertMany([
      {
        name: "admin",
        email: "admin@gmail.com",
        password: hashed_pass,
        user_types:"673189f5d80b14186bcaaec0"
    }
    ]).then(res => {
      console.log(res.insertedCount);
    })
  },

  down: (models, mongoose) => {
    return models.users.deleteMany(
      {
        _id:"673189f5d80b14186bcaaec0"
     }
    ).then(res => {
     console.log(res.deletedCount);
   })
  }
};
