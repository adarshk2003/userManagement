const express=require('express');
const router=express.Router();
const userController=require('../controller.js/userController');
const { set } = require('mongoose');
const accessControl=require('../utils/access-controll').accessControl;




function setaccessControl(access_types){
    return (req,res,next) =>{
        accessControl( access_types, req, res, next);
    }
}

router.post('/users',setaccessControl("2"),userController.crearUser);
router.get('/users',setaccessControl("1"),userController.getAllUser);
router.get('/user/:id',setaccessControl("1,2"),userController.getSingleUSer);



module.exports=router;