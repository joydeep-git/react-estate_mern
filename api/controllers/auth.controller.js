import User from "../model/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {

    const { username, email, password } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        username, email, password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created!" })
    } catch (err) {
        res.status(500).json(err.message);
    }
};