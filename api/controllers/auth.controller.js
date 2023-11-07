import User from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/Error.js";

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username, email, password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created!" })
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        const validUser = await User.findOne({ email });

        if (!validUser) {
            next(errorHandler(404, "No user with this email!"));
        } else {
            const validPassword = await bcrypt.compare(password, validUser.password);

            if (!validPassword) {
                next(errorHandler(401, "Wrong credential !"));
            } else {
                const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KET);

                const { password: pass, ...rest } = validUser._doc;

                res
                    .cookie("token", token, { httpOnly: true })
                    .status(200)
                    .json({ rest })
            }
        }
    } catch (err) {
        next(err);
    }
};