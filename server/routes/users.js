////////////////
//for ADMIN ONLY
////////////////
const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const userRoutes = express.Router();

const User = require('../models/user-model')

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public//uploads/users"
});



// create new user
userRoutes.post('/api/users/new', myUploader.single('phoneImage'), (req, res, next) => {
  if(!req.user){
      res.status(401).json({message: "Log in to create user."});
      return;
  }
  const newUser = new User({
    phone: req.body.phone,
    email: req.body.email,
  
  });
  if(req.file){
      newUser.image = '/uploads/' + req.file.filename;
  }

  newUser.save((err) => {
      if(err){
          res.status(500).json({message: "Some weird error from DB."});
          return;
      }
      // validation errors
      if (err && newUser.errors){
          res.status(400).json({
              brandError: newUser.errors.email,
          });
          return;
      }
      //req.user.encryptedPassword = undefined;
      //newPhone.user = req.user;

      res.status(200).json(newUser);
  });
});
// list the users
userRoutes.get('/api/users', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see properties." });
      return;
    }
    User.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheUsers) => {
        if (err) {
          res.status(500).json({ message: "Users find went bad." });
          return;
        }
        res.status(200).json(allTheUsers);
      });
});

// list single User
userRoutes.get("/api/users/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see the users." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "User find went bad." });
      return;
    }

    res.status(200).json(theUser);
  });
});

// update the User
userRoutes.put('/api/users/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the user." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    const updates = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

  User.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "User updated successfully."
    });
  });
});

// delete User
userRoutes.delete("/api/user/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the user." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }

  User.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "User has been removed."
    });
  });
});


module.exports = userRoutes;
