const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Bookmarks = require("../models/bookmarkedVenues");

// Add a bookmark
exports.addBookmark = catchAsyncError(async (req, res, next) => {
  const { id, userId } = req.body;

  const bookmark = await Bookmarks.findOne({ user: userId });
  if (bookmark) {
    // Check if the venue is already bookmarked
    if (bookmark.bookmarks.includes(id)) {
      return next(new ErrorHandler("Venue already bookmarked", 400));
    }
    // Add the venue to the bookmarks array
    bookmark.bookmarks.push(id);
    await bookmark.save();
  } else {
    // Create a new bookmark document and add the venue
    await Bookmarks.create({
      user: userId,
      bookmarks: [id],
    });
  }

  res.status(200).json({
    success: true,
    message: "Bookmark added successfully",
  });
});

// Get all bookmarked venues
exports.getAllBookmarkedVenues = catchAsyncError(async (req, res, next) => {
  // console.log(req);
  const userId = req.params.id;
  const bookmark = await Bookmarks.findOne({ user: userId }).populate(
    "bookmarks"
  );

  if (!bookmark) {
    return res.status(200).json({
      success: true,
      bookmarks: [],
    });
  }

  res.status(200).json({
    success: true,
    bookmarks: bookmark.bookmarks,
  });
});

// Remove a bookmark
exports.removeBookmark = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  const userId = req.body.userId;

  const bookmark = await Bookmarks.findOne({ user: userId });
  if (!bookmark) {
    return next(new ErrorHandler("Bookmark not found", 404));
  }

  // Remove the venue from the bookmarks array
  bookmark.bookmarks = bookmark.bookmarks.filter(
    (bookmarkId) => bookmarkId.toString() !== id
  );
  await bookmark.save();

  res.status(200).json({
    success: true,
    message: "Bookmark removed successfully",
  });
});

// Check if a venue is bookmarked
exports.isVenueBookmarked = catchAsyncError(async (req, res, next) => {
  const { userId, venueId } = req.params;

  const bookmark = await Bookmarks.findOne({ user: userId });

  if (!bookmark) {
    return res.status(200).json({
      success: true,
      isBookmarked: false,
    });
  }

  const isBookmarked = bookmark.bookmarks.includes(venueId);

  res.status(200).json({
    success: true,
    isBookmarked,
  });
});
