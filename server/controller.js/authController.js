const users = require('../db/models/users');
const { success_function, error_function } = require('../utils/responce-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = async(req,res)=> {
    try {
        let email = req.body.email;
        console.log("email", email);
        
        let password = req.body.password;
        console.log(password);


        //validation

        let user = await users.findOne({ email });
        console.log(user);

        if (user) {
            let dbpass = user.password;
            console.log(dbpass);

            let passwordMatching = bcrypt.compareSync(password, dbpass);
            console.log(passwordMatching);

            if (passwordMatching) {
                let token = jwt.sign({ user_id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '10d' });
                let responce = success_function({
                    statusCode: 200,
                    data: token,
                    message:"login successfull"
                })
            }
        }
    } catch (error) {
        
    }
}