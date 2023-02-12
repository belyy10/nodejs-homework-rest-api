const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/[a-z0-9]+@[a-z0-9]+/, "user email is not valid!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contact",
      },
    ],
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", schema);

module.exports = { User };
