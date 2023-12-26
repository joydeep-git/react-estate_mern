import { errorHandler } from "../utils/Error.js";

import bcrypt from "bcrypt";

import User from "../model/User.model.js";
import Listing from "../model/Listing.model.js";

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(404, `You can not update other user's account`));

    try {

        if (req.body.password && req.body.password.length > 0 && req.body.password.length < 6) {
            next(errorHandler(400, "Minimum 6 character Password!"));
        }

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
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
};

export const getUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return next(404, 'User not Found!');
            } else {
                const { password: pass, ...rest } = user._doc;

                res.status(200).json(rest);
            }

        } catch (error) {
            next(error);
        }
    } else {
        next(404, 'You are the property owner.');
    }
};