const mongoose = require("mongoose");
const User = require("../models/User");

const orderSchema = new mongoose.Schema({
  bookVenue: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      venue: {
        type: mongoose.Schema.ObjectId,
        ref: "Venue",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paidAt: {
      type: Date,
      required: true,
    },
    venuePrice: {
      type: Number,
      required: true,
    },
    totalPaid: {
      type: Number,
      required: true,
    },
  },
  venueStatus: {
    type: String,
    required: true,
    default: "Event coordination underway - Expect a call from our staff soon!",
  },
  eventType: {
    type: String,
    required: true,
  },
  eventAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
