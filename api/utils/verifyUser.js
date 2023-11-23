import jwt from "jsonwebtoken";

import { errorHandler } from "./Error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next(errorHandler(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET_KET, (err, user) => {
        if (err) return next(errorHandler(403, "FORBIDDEN"));

        req.user = user;
        next();
    })
};