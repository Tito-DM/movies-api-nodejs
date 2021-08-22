const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv")



dotenv.config();

const auth = async (req,res)=>{

    const newUser = new User({
        username: req.body.username,
        email: req.body.email, 
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
  
    //save to the db
    try {
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
  
  }

  module.exports = {auth}