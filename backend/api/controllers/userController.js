const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

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

module.exports = {update};
