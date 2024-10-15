const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connect');
const userRouters = require('./routes/userRouts');
const authRouts = require('./routes/authRout');


app.get('/test', (req, res) => {
    res.status(200).send("test successfull");
});

//files to server

app.use(express.static('../client'));
app.use('/upload', express.static('./upload'));


//db connection

mongoConnect();

//parse json data



app.use(express.json({ limit: "100mb" }));

//parse from datas

app.use(express.urlencoded({ extended: true }));
//userRoutes
app.use(userRouters);
app.use(authRouts);

app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`)
});