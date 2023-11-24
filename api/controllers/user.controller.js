import { errorHandler } from "../utils/Error.js";

import bcrypt from "bcrypt";

import User from "../model/User.model.js";
import Listing from "../model/Listing.model.js";

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(404, `You can not update other user's account`));

    try {

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);

    } catch (err) {
        next(err);
    }

};

export const deleteUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(401, "Users only can delete their own account!"));

    try {
        await User.findByIdAndDelete(req.params.id);

        res.clearCookie("token");

        res.status(200).json("User account Deleted!");
    } catch (err) {
        next(err);
    }
};

export const getUserListings = async (req, res, next) => {

    if (req.user.id === req.params.id) {

        try {
            const listings = await Listing.find({ useRef: req.params.id });
            res.status(200).json(listings);
        } catch (err) {
            next(err);
        }

    } else {
        next(errorHandler(401, "User can see their own listings only!"))
    }
};