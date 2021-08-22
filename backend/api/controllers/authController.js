const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")


dotenv.config();

const resgister = async (req,res)=>{

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

  const login = async (req,res)=>{

  try {

      const user = await User.findOne({email: req.body.email})
      !user && res.status(401).json("wrong password or username")

      // Decrypt password
      const  bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      
      //compare password
      originalPassword !== req.body.password && res.status(401).json("wrong password or username")
      
      // create acess token 
        const acessToken = jwt.sign({
            id: user.id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: "5d"});

      // destructure user to avoid sendding password
      const {password, ...info} = user._doc

         //send a response
      res.status(200).json({...info,acessToken})

  } catch (error) {
      res.status(500).json(erro)
  }
  }


  module.exports = {resgister,login}