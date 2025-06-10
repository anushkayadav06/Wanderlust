const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default-filename"
        },
        url: {
            type: String,
            default: "https://via.placeholder.com/300",
        }
    },
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        required: true,
        enum: ["Trending", "Rooms", "Iconic-cities", "Mountain", "Castles", "Arctic","Village", "Camping"],
        require:true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type : Schema.Types.ObjectId,
        ref:"User",
    },
});

ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
