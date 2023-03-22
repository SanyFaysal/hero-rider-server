const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Name is too small"],
      maxLength: [100, "Name is too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: true,
      message: "Please enter a password",
    },
    phone: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    age: Number,

    address: {
      type: String,
    },
    area: {
      type: String,
    },
    carName: {
      type: String,
    },
    carModel: {
      type: String,
    },
    namePalate: String,

    vehicleType: {
      type: String,
      enum: {
        values: ["car", "bike"],
        message: "{VALUE} can't be a vehicle type",
      },
    },
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "in-active", "blocked"],
        message: "{VALUE} can't be a status",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["learner", "rider", "admin"],
        message: "{VALUE} can't be a role",
      },
    },
    profilePicture: [
      {
        type: Array,
        validate: [validator.isURL, "wrong url"],
      },
    ],

    drivingLicense: [
      {
        type: Array,
        validate: [validator.isURL, "wrong url"],
      },
    ],

    nid: [
      {
        type: Array,
        validate: [validator.isURL, "wrong url"],
      },
    ],
  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hash = bcrypt.hashSync(password);
  this.password = hash;

  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
