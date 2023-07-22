const express = require("express");
const { newOrder, myOrders, getSingleOrders } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/orders").get(isAuthenticatedUser,myOrders);
router.route("/orders/:id").get(isAuthenticatedUser,getSingleOrders);

module.exports = router;
