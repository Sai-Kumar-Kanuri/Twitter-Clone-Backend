const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const cookieParser = require("cookie-parser");
const cors = require(cors);

const app = express();
dotenv.config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to MONGODB");
        })
        .catch((err) => {
            throw err;
        });
};

connect();

const port = process.env.PORT

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Twitter clone 🥳");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);



app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});