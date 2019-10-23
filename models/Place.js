const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const placeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    location_name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["Hospital", "Clínica", "Centro de Salud", "Consultorio", "Otro"],
      default: "Hospital"
    },
    address: {
      type: String,
      required: true
    },    
    phone_number: {
      type: Number,
      required: true
    },
    coords: {
      type: [Number],
      required: true
    },
    web_site: {
    type: String,
    required: true
      },
    images: {
      type: [String],
      minlength: 1
    }
  },
  { timestamps: true }
);

module.exports = model("Place", placeSchema);