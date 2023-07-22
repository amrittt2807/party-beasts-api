const Order = require("../models/bookingModels");
const Venue = require("../models/PartyVenues");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/User")

//create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { bookVenue, paymentInfo, eventAt, eventType } = req.body;
  const order = await Order.create({
    bookVenue,
    paymentInfo,
    eventAt,
    eventType,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get users orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});



//get single orders
exports.getSingleOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if(!order){
    return next(new ErrorHandler("Order not found with this id", 404))
  }
  res.status(200).json({
    success: true,
    order,
  });
});
