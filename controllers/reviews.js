const Review = require("../models/reviews.js");
const Listing=require("../models/listing.js");

module.exports.post=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user;
    console.log(newReview.username);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review save");
    req.flash("success","New review added !!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.delete=async(req,res)=>{
    let {id,reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull :{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted !");
    res.redirect(`/listings/${id}`);

};