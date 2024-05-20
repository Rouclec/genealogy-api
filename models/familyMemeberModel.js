const { Schema, models, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator")

const familyMemberSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    placeOfResidence: String,
    phoneNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please enter a valid phone number"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    dateOfBirth: Date,
    parents: [
      {
        type: Schema.ObjectId,
        ref: "FamilyMember",
      },
    ],
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

familyMemberSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already in use, please try another!",
}); //enable beautifying on this schema

const FamilyMember = model("FamilyMember", familyMemberSchema);
module.exports = FamilyMember;
