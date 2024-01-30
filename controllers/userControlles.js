const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken")



const getUsers = (req, res) => {
  res.send("Done..");
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
   
    //.redirect("/login")
  } catch (err) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email});
    if (user) {
        const hashedPassword = bcrypt.compare(password, user.password)
        if(hashedPassword){
            const accessToken = jwt.sign({
                user:{
                    username:user.name,
                    email: user.email,
                    id : user.id
                }
            },
            process.env.ACCESS_TOKEN_CODE,
            {expiresIn: "15m"});
            
            res.status(200).json({accessToken});
        }else{
            res.status(401).send(error.message);
            //res.redirect("/signup");
        }
     
    } else {
      res.status(401).send(error.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { createUser, getUsers, loginUser };
