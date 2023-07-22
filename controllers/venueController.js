const Venue = require("../models/PartyVenues");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create Venue --Admin
exports.createVenue = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const venue = await Venue.create(req.body);
  res.status(201).json({
    success: true,
    venue,
  });
});

//Get All Venues
exports.getAllVenues = catchAsyncError(async (req, res) => {
  const venues = await Venue.find();
  res.status(200).json({
    venues,
  });
});

//Get a Single Venue
exports.getVenueDetails = catchAsyncError(async (req, res, next) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    return next(new ErrorHandler("Venue Not Found", 404));
  }
  res.status(200).json({
    success: true,
    venue,
  });
});

//Update Venue --Admin
exports.updateVenue = catchAsyncError(async (req, res, next) => {
  let venue = await Venue.findById(req.params.id);
  if (!venue) {
    return next(new ErrorHandler("Venue Not Found", 404));
  }
  venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    venue,
  });
});

//Deleting Venue
exports.deleteVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return next(new ErrorHandler("Venue Not Found", 404));
    }

    await venue.deleteOne();

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//Create New Review or Update Review
exports.createVenueReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, venueId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const venue = await Venue.findById(venueId);
  const isReviewed = venue.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    venue.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    venue.reviews.push(review);
    venue.numOfReviews = venue.reviews.length;
  }

  let avg = 0;
  for (const rev of venue.reviews) {
    avg += rev.rating;
  }
  venue.ratings = avg / venue.reviews.length;

  await venue.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get all reviews of a venue
exports.getVenueReviews = catchAsyncError(async (req, res, next) => {
  const venue = await Venue.findById(req.query.id);
  if (!venue) {
    return next(new ErrorHandler("Venue not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: venue.reviews,
  });
});

//Deleting a review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const venue = await Venue.findById(req.query.venueId);
  if (!venue) {
    return next(new ErrorHandler("Venue not found", 404));
  }
  const reviews = venue.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = 0;
  if (reviews.length) ratings = avg / reviews.length;

  const numOfReviews = reviews.length;
  await Venue.findByIdAndUpdate(
    req.query.venueId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Find a venue based on event type
exports.getVenueByEventType = async (req, res, next) => {
  const eventType = req.params.eventType;
  try {
    const venues = await Venue.find({ "events.eventName": eventType })

    res.status(200).json({
      success: true,
      venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
