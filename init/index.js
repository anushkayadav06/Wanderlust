const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    // Fix: Store the modified array and pass it to insertMany
    const modifiedData = initData.data.map((obj) => ({
        ...obj,
        owner: "67e6678a5bfdfc564b6cda56"
    }));

    await Listing.insertMany(modifiedData);
    console.log("Data was initialized");
};

initDB();
