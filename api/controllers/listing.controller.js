import Listing from "../model/Listing.model.js";
import { errorHandler } from "../utils/Error.js";

export const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);

        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"))
    }

    if (req.user.id !== listing.userRef) {
        next(errorHandler(404, "User can only delete their own listings!"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);

        res.status(200).json("Listing has been deleted.")
    } catch (error) {
        next(error);
    }

};

export const updateListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"))
    }

    if (req.user.id !== listing.userRef) {
        next(errorHandler(404, "User can only delete their own listings!"));
    };

    try {
        const updatedList = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedList);
    } catch (err) {
        next(err);
    }
};

export const getListing = async (req, res, next) => {

    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            next(errorHandler(404, 'Not found!'));
        }

        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};