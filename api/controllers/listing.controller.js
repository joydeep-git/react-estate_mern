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

export const getAllListings = async (req, res, next) => {

    try {
        
        const limit = parseInt(req.query.limit) || 9;

        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['rent', 'sale'] };
        }

        let searchTerm = req.query.searchTerm || '' ;

        let sort = req.query.sort || 'createdAt';
        
        let order = req.query.order || 'desc';
        

        const listings = await Listing.find(
            {
                name: { $regex: searchTerm, $options: "i" },
                offer,
                furnished,
                parking,
                type
            }
        ).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);


    } catch (error) {
        next(error);
    }
};