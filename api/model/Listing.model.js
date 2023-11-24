import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discountedPrice: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        bedrooms: {
            type: Number,
            required: true
        },
        furished: {
            type: Boolean,
            required: true
        },
        parking: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        offer: {
            type: Boolean,
            required: true
        },
        imageURLs: {
            type: Array,
            required: true
        },
        userdata: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;