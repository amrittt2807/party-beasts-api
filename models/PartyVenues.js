const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter The Venue Name"],
  },
  description: {
    type: String,
    required: [true, "Please write a description for your venue"],
  },
  price: {
    type: Number,
    required: [true, "Please add the starting price"],
  },
  location:{
    type: String,
    required: [true, "Please add your location url"]
  },
  events: [
    {
      eventName: {
        type: String,
        default: 0,
      },
      eventPrice: {
        type: Number,
        default: 0,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  numOfReviews:{
    type:Number,
    default:0,
  },
  reviews: [
    {
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment:{
        type: String,
      }
    },
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Venue", venueSchema);
