const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const Review = require("../models/reviews.js");
const Listing=require("../models/listing.js");
const { validateReview, isLoggedIn, isOwner, isReviewAuthor} = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");



//Review Post
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.post));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.delete));

module.exports = router;