const jwt = require("jsonwebtoken");
const users = require("../db/models/users");
const control_data = require("./control_data.json"); 
const { success_function, error_function } = require("./response-handler");
const dotenv = require("dotenv");
dotenv.config(); 

exports.accessControl = async function (access_types, req, res, next) {
    try {
        console.log("access_types :", access_types);

        if (access_types === "*") {
            return next();
        }

        const authHeader = req.headers['authorization'];
        console.log("authHeader :", authHeader);

        if (!authHeader) {
            let response = error_function({
                statusCode: 400,
                message: "Please login to continue"
            });
            return res.status(response.statusCode).send(response);
        }

        const token = authHeader.split(" ")[1];
        console.log("token :", token);

        if (!token || token === "null" || token === "undefined") {
            let response = error_function({
                statusCode: 400,
                message: "Invalid access token"
            });
            return res.status(response.statusCode).send(response);
        }

        jwt.verify(token, process.env.PRIVATE_KEY, async function (err, decoded) {
            if (err) {
                let response = error_function({
                    statusCode: 400,
                    message: "Authentication failed"
                });
                return res.status(response.statusCode).send(response);
            }

            console.log("decoded :", decoded);

            let user = await users.findOne({ _id: decoded.user_id }).populate("user_type");
            console.log("user :", user);

            if (!user) {
                let response = error_function({
                    statusCode: 404,
                    message: "User not found"
                });
                return res.status(response.statusCode).send(response);
            }

            if (!user.user_type) {
                let response = error_function({
                    statusCode: 400,
                    message: "User type not defined"
                });
                return res.status(response.statusCode).send(response);
            }

            let user_type = user.user_type.user_type;
            console.log("user_type :", user_type);

            let allowed = access_types.split(",").map((obj) => control_data[obj]);
            console.log("allowed :", allowed);

            if (allowed && allowed.includes(user_type)) {
                return next();
            } else {
                let response = error_function({
                    statusCode: 403,
                    message: "Not allowed to access the route"
                });
                return res.status(response.statusCode).send(response);
            }
        });
    } catch (error) {
        console.log("error :", error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : "Something went wrong"
        });
        res.status(response.statusCode).send(response);
    }
};
