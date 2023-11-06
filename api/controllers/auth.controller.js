import User from "../model/User.model.js";
import bcrypt from "bcrypt";

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