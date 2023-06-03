const express = require("express");
const { userModel } = require("../Model/user.Model");
const bcypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userRouter = express.Router();


userRouter.post("/signup", async  (req, res) =>{
    try {
        let {email, password} = req.body;
        const user = await userModel.find({email});
        if(user.length > 0){
           return res.status(400).json({msg: "User Already Exist"})
        }
        let pass = await bcypt.hash(password, 10);
        password = pass;
        console.log(password)
        const newUser = new userModel({email, password});
        await newUser.save();
        res.status(200).json({msg: "User Register Successfully"})


    } catch (error) {
       res.status(500).json({msg: "Internal Server Error", error})
    }
})

userRouter.post("/login", async (req, res) => {
        try {
            let {email, password} = req.body;

            let user = await userModel.find({email});
            if(user.length == 0){
                return res.status(400).json({msg: "User Not Found"})
            }

            let isMatch = await bcypt.compare(password, user[0].password);
            if(!isMatch){
                return res.status(400).json({msg: "Invalid Credentials"})
            }

            let token = jwt.sign({id: user[0]._id}, process.env.token_key, {expiresIn: "1h"});
            res.status(200).json({msg: "User Login Successfully", token,user})

        } catch (error) {
            res.status(500).json({msg: "Internal Server Error", error})
        }
})






module.exports = {userRouter}