const userModel = require("../models/user").userModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

// for rotues level validation without helpers in signin method
const {check, validationResult, body} = require('express-validator');

//  for user register
const signup = async (req, res) => {
  if (req.method == "GET") {
    res.render("signUp");
  } else {
    // check exsting user
    // hash password
    // user creation
    // token generation
    
    const { username, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ username: username });
      if (existingUser) {
        return res.status(400).json({ message: "User already existed" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create({
        username: username,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { username: result.username, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Something went wrong"})
    }
   
  }
};

//  for user login or sign in
const signin = async (req, res) => {
  if(req.method == "GET"){
    res.json('signin')
  } else {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // else
    // check if username exists or not 
    //  check if hashed password matches or not 
    //  generate jwt token and return token as a response
    const { username, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ username: username });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }


      // check if password matches or not
      const matchPassword = await bcrypt.compare(password, existingUser.password)
      if(!matchPassword){
        return res.status(400).json({ message: "Invalid Password" });
      }

      // send auth token if username and password matches
      const token = jwt.sign(
        { username: existingUser.username, id: existingUser._id },
        SECRET_KEY
      );
      res.status(201).json({token: token });

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Something went wrong"})
    }



    
  }


};

module.exports = { signup, signin };
