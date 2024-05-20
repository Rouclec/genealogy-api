const {Schema, models, model} = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a valid email yea?"],
      // unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false, //do not select password for every user query
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match!!",
      },
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    profilePic: String,
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema


//Pre method runs before a user object is 'saved'
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if the password has not been modified, go to the next middleware
  this.password = await bcrypt.hash(this.password, 12); //encrypt the password with a strength of 12
  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //genrates a random 32 characters hexadecimal string

  this.resetToken = crypto
    .createHash("sha256") //create a sha256 hash with the randomly genrated string above
    .update(resetToken)
    .digest("hex");

  this.resetTokenExpiration = Date.now() + 10 * 60 * 1000; //set reset token expiration to 10 minutes from now

  return resetToken;
};

const User = model("User", userSchema);
module.exports = User;
