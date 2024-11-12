'use strict';

const UserType = require("../models/user_types");

module.exports = {
  up: (models, mongoose) => {
    return UserType.insertMany([
      {
        _id: "673189f5d80b14186bcaaec0",
        user_types: "admin"
      },
      {
        _id: "67318f01d80b14186bcaaec9",
        user_types: "employee"
      }
    ]).then(res => {
      console.log(`${res.insertedCount} user types inserted.`);
    }).catch(err => {
      console.error("Error inserting user types:", err);
    });
  },

  down: (models, mongoose) => {
    return UserType.deleteMany(
      {
        _id: {
          $in: [
            '673189f5d80b14186bcaaec0',
            '67318f01d80b14186bcaaec9'
          ]
        }
      }
    ).then(res => {
      console.log(`${res.deletedCount} user types deleted.`);
    }).catch(err => {
      console.error("Error deleting user types:", err);
    });
  }
};
