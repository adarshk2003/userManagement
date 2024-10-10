const users = require('../db/models/users');
const { success_function, error_function } = require('../utils/responce-handler');
const bcrypt=require('bcrypt');
const fileUpload=require('../utils/fileUpload').fileUpload;
const user_types=require('../db/models/user_type');


exports.createUser=async function(res,req){
    try {
        let body = req.body;
        console.log("body:", body);

        let name = req.body.name;
        console.log("name:", name);

        let email = req.body.email;
        console.log("email;", email);

        let age = req.body.age;
        console.log('age', age);

        let password = req.body.password;
        console.log("password", password);

        let image = req.body.image;
        
        if (image) {
            let img_path = await fileUpload(image, "users");
            console.log("img_path", img_path);
            body.image = img_path;
        }
        



        //validation  

        if (!name) {
            Response = error_function({
                statusCode: 400,
                message: 'name is required'
            });
        }
        res.status(Response.statusCode).send(Response);
        return;


        let count = await users.countDocument({ email });
        console.log("count", count);

        if (count > 0) {
            
            res.status(400).send("user already exists");
            return;
        }
        

        //hashimnh password


        let salt = bcrypt.genSaltSync(10);
        console.log("salt", salt);
        
        let hashed = bcrypt.hashSync(password, salt);
        console.log("hashed password:", hashed);
        
        body.password = hashed;
        let newUser = await users.create(body);

        if (newUser) {
            Response = res.status(200).send("user created successfully");
            return; 
        }
        else {
            res.status(400).send("user creation failed");
            return;
        }

    } catch (error) {
        console.log("error", error);
        res.status(400).send(error.message ? error.message : 'somthing wend wrong');
    }
}

exports.getAllUsers = async function (req, res) {
    try {
        let userData = await users.find().populate({ path: "user_type", select: "-__v" }).select("-__v");
        console.log("userData", userData);
        
        res.status(200).send(userData);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message ? error.message : error);

    }
}

exports.getSingleUser=async function (req,res) {
    try {
        let id = req.params.id;
        console.log(id);

        let userData = await user_types.find({ _id: id });
        console.log(userData);

        res.status(200).send(userData);
        return;
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message ? error.message : error);

    }
}