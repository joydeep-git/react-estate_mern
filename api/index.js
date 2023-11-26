import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.route.js";
import listingRouter from "./routers/listing.route.js";

dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("mongoDB connected");
}).catch(err => console.log(err));

const app = express();

app.use(cookieParser());

app.use(express.json());

app.listen(3000, () => {
    console.log('server running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});