'use strict';
const bcrypt=require('bcrypt')

module.exports = {
  up: (models, mongoose) => {
    let password = "zxcvB@123"
    let salt = bcrypt.genSaltSync(10);
    const hashed_pass = bcrypt.hashSync(password, salt);
   
      return models.Test.bulkWrite([
        {
          "name": "admin",
          "email": "admin@gmail.com",
          "password": hashed_pass,
          "user_type":"670ca5cc86f4183a7043d7ee "
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.users.deleteMany({
      _id:"670ca60986f4183a7043d7ef"
    }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
