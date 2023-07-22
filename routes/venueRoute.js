const express = require("express");
const {
  getAllVenues,
  createVenue,
  updateVenue,
  deleteVenue,
  getVenueDetails,
  createVenueReview,
  getVenueReviews,
  deleteReview,
  getVenueByEventType,
} = require("../controllers/venueController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/venues").get(getAllVenues);
router
  .route("/admin/venues/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createVenue);
router
  .route("/venues/event-type/:eventType")
  .get(getVenueByEventType);
router
  .route("/admin/venues/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateVenue)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVenue);

router.route("/venues/:id").get(getVenueDetails);
router.route("/review").put(isAuthenticatedUser, createVenueReview);

router
  .route("/reviews")
  .get(getVenueReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
