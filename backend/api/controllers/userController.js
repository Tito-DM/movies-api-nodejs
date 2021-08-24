const User = require("../models/User");
const CryptoJS = require("crypto-js");


//get all user
const index = async (req, res) => {
  try {
    
    const user = await User.find().limit(10);
  
  //map user data
  const newUsers = user.map( u =>{
      const {password, ...other} = u._doc
      return other
    })
   
    //send response
    res.status(200).json(newUsers);
  } catch (error) {}
 
};



//get single user
const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //filter user data
    const { password, ...otherData } = user._doc;
    //send response
    res.status(200).json(otherData);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update user
const update = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updateUser);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
};

//delete user
const remove = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user was deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can delete only your account");
  }
};

module.exports = { index, show, update, remove };
