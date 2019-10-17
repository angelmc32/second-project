const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const profSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    Place: {
      type: Schema.Types.ObjectId,
      ref: "Place"
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    lastname: {
      type: String,
      required: true
    },
    second_surname: {
      type: String,
      required: true
    },    
    
    birth: {
      type: Date,
      required: true
    },
    gender: {
      type:String ,
      required: true
    },
    i_card: {
      type:Number ,
      required: true
    },
    image_article: {
      type: [String],
      minlength: 1
    }
  },
  { timestamps: true }
);

module.exports = model("Prof", profSchema);