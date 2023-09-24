const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const handleError = require("../middleware/error");

const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // const newUser = new User({ ...req.body, password: hash });
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT);

        const { password, ...othersData } = newUser._doc;


        res.cookie('access-token', token, {
            httpOnly: true,
        }).status(200).json(othersData);

        res.status(200).json(newUser);

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ username: req.body.username })

        if (!user) { return next(handleError(404, "User Not Found")) };

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isValidPassword) return next(handleError(400, "Wrong Password"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);


        const { password, ...othersData } = user._doc;

        // res.cookie("access_token", token, { httpOnly: true }).status(200).json(othersData);
        res.cookie("access_token", token).status(200).json(othersData);


    } catch (error) {
        next(error);
    }
}




module.exports = { signup, login };