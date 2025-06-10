const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


router.route("/")
.get( wrapAsync(listingController.index)) //index route
.post(isLoggedIn,upload.single('image'),  wrapAsync(listingController.create));  //create route


//Add new
router.get("/new", listingController.new);

//search
router.get("/search",wrapAsync(listingController.search));

router.route("/:id")
.get(wrapAsync(listingController.show)) //show route
.put( isLoggedIn, isOwner,upload.single('image'), wrapAsync(listingController.update)) //update route
.delete( isLoggedIn, isOwner,wrapAsync(listingController.delete)); //delete route



//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.edit));

//filter
router.get("/category/:category", wrapAsync(listingController.filter));


module.exports = router;
