import { errorHandler } from "../utils/Error.js";

import bcrypt from "bcrypt";

import User from "../model/User.model.js";

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