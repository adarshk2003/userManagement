'use strict';

const user_type = require("../models/user_type");

module.exports = {
  up: (models, mongoose) => {
      return models.user_types.insertMany([
        {
          _id: "670ca5cc86f4183a7043d7ee",
          user_type:"admin"
        },
        {
          _id: "670ca60986f4183a7043d7ef",
          user_type:"employee"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    return models.Test.bulkWrite({
      _id: {
        $in:[
        "670ca60986f4183a7043d7ef",
          "670ca5cc86f4183a7043d7ee"
        ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
