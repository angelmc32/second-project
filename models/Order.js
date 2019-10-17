const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    place: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    prof: {
      type: Schema.Types.ObjectId,
      ref: "prof"
    },
    type: {
      type: String,
      required: true,
      unique: true
    },
    paymet: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);