const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  addBookmark,
  getAllBookmarkedVenues,
  removeBookmark,
  isVenueBookmarked,
} = require("../controllers/bookmarksController");

router.route("/bookmark/new").post(addBookmark);
router.route("/bookmarks/:id").get(getAllBookmarkedVenues);
router.route("/bookmarks/remove").delete(removeBookmark);
router.route("/bookmarks/find/:userId/:venueId").get(isVenueBookmarked);

module.exports = router;
