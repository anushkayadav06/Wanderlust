const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

const axios = require('axios');

async function getCoordinates(location) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                q: location,
                format: 'json'
            }
        });

        if (response.data.length > 0) {
            return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("reviews")
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    listing.coords = await getCoordinates(listing.location);

    res.render("listings/show.ejs", { listing });
};


module.exports.create = async (req, res, next) => {
    console.log("File Uploaded: ", req.file);  // Debugging step
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { filename, url };
    } else {
        console.log("No file uploaded!");
    }

    await newListing.save();
    req.flash("success", "New location added !!");
    res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exit !");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.update = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    let updatedData = { ...req.body.listing };
    if (!req.body.listing.image || !req.body.listing.image.url) {
        updatedData.image = listing.image; // 
    }
    await Listing.findByIdAndUpdate(id, updatedData);

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }
    req.flash("success", "Listing updated !!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted !!");
    res.redirect("/listings");
};

module.exports.filter = async (req, res) => {
    const { category } = req.params;

    const filteredListing = await Listing.find({ category });
    if (filteredListing.length === 0) {
        req.flash("error", `No listings found for category: ${category}`);
    }

    res.render("listings/filter.ejs", { filteredListing, category });
};

module.exports.search = async (req, res) => {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.trim() === "") {
        return res.render("listings/search.ejs", { listings: [], query: "" });
    }

    const listings = await Listing.find({
        $or: [
            { country: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/search.ejs", { listings, query: q });
};