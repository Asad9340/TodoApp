const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    Password: { type: String },
    UserName: { type: String, unique: true },
    Email: { type: String, unique: true },
    PhoneNumber: { type: String, unique: true },
    Age: { type: Number },
    Gender: { type: String },
    Address: { type: String },
    DateOfBirth: { type: Date },
    Occupation: { type: String },
    Education: { type: String },
    LastUpdated: { type: Date, default: Date.now },
    Created: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    collection: 'Profile'
  }
);

const ProfileModel = mongoose.model('Profile', ProfileSchema);
module.exports = ProfileModel;
