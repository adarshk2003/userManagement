'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.user_types.insertMany([
        {
          _id : "670decb86e0d8b14334c537d",
          user_type : "admin"
        },
        {
          _id : "670decb86e0d8b14334c537e",
          user_type : 'employee'
        }
       
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
   
    return models.user_types.deleteMany({
      _id: {
        $in: [
          "670decb86e0d8b14334c537d",
          "670decb86e0d8b14334c537e"
        ]
      }
    }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};
