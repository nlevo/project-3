const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const propertyRoutes = express.Router();

const Property = require('../models/property-model')

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/properties"
});

// create new property
propertyRoutes.post('/api/properties', myUploader.single('phonePic'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create property."});
        return;
    }
    const newProperty = new Property({
      name: req.body.name, 
      building: req.body.building, 
      unit: req.body.unit,
      isActive: req.body.isActive,
      address: {
        apartment_num: req.body.apartment_num,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
      effective_date: req.body.effective_date,
      end_date: req.body.end_date,
      floor_plan: req.body.floor_plan,
      max_occupancy: req.body.max_occupancy,
      comments: req.body.comments,
      special_instructions: req.body.special_instructions,
      rating: req.body.rating,
      bathrooms: req.body.bathrooms,
      bedrooms: []
    });
    if(req.file){
        newProperty.image = '/uploads' + req.file.filename;
    }

    newProperty.save((err) => {
        if(err){
            res.status(500).json({message: "Some weird error from DB."});
            console.log(err);
            return;
        }
        // validation errors
        if (err && newProperty.errors){
            res.status(400).json({
                brandError: newProperty.errors.brand,
            });
            return;
        }
        res.status(200).json(newProperty);
    });
});

// list the properties

propertyRoutes.get('/api/properties', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see properties." });
      return;
    }
    Property.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheProperties) => {
        if (err) {
          res.status(500).json({ message: "Properties find went bad." });
          return;
        }
        res.status(200).json(allTheProperties);
      });
});

// list single property
propertyRoutes.get("/api/properties/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE properties." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Property.findById(req.params.id, (err, theProperty) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Properties find went bad." });
      return;
    }

    res.status(200).json(theProperty);
  });
});

// update the property
propertyRoutes.put('/api/properties/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the property." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    const updates = {
      name: req.body.name,
      floor_plan: req.body.floor_plan,
      comments: req.body.comments
    };

  Property.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Property updated successfully."
    });
  });
});

// delete property
propertyRoutes.delete("/api/property/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the property." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }

  Property.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Property has been removed."
    });
  });
});


module.exports = propertyRoutes;
