// Example seed for user_types
module.exports = {
    up: async (models) => {
        const userTypes = [
          {
            _id: "670decb86e0d8b14334c537d",
            user_type: "Admin"
          },
          {
            _id: "670decb86e0d8b14334c537e",
            user_type: "Employee"
          }
        ];

        for (const userType of userTypes) {
            const existingType = await models.user_types.findOne({ _id: userType._id });
            
            if (!existingType) {
                const newUserType = new models.user_types(userType);
                await newUserType.save();
                console.log(`${userType.user_type} seeded successfully`);
            } else {
                console.log(`${userType.user_type} already exists, skipping seed.`);
            }
        }
    },

    down: async (models) => {
        const userTypeIds = [
            "670decb86e0d8b14334c537d", // Admin
            "670decb86e0d8b14334c537e"  // Employee
        ];
        
        await models.user_types.deleteMany({ _id: { $in: userTypeIds } });
        console.log('User types removed');
    }
};
