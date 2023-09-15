const handleError = require("../middleware/error");
const User = require("../models/userModel");
const Tweet = require("../models/tweetSchema");


const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {


    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                {
                    new: true,
                }
            );


            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        next(handleError(403, "You can onlu update your own account"));
    }

}

const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            await Tweet.remove({ userId: req.params.id });

            res.status(200).json("User delete");
        } catch (err) {
            next(err);
        }
    } else {
        return next(handleError(403, "You can only update your own account"));
    }
};



const follow = async (req, res, next) => {

    try {

        const toBeFollowed = await User.findById(req.params.id);
        const presentUser = await User.findById(req.body.id);

        if (!toBeFollowed.followers.includes(req.body.id)) {
            await toBeFollowed.updateOne({
                $push: { followers: req.body.id }
            });

            await presentUser.updateOne({
                $push: { following: req.params.id }
            });
        } else {
            res.status(403).json("you already follow this user");
        }

        res.status(200).json("following the user");
    } catch (error) {
        next(error);
    }

}

const unfollow = async (req, res, next) => {

    try {

        const toBeUnFollowed = await User.findById(req.params.id);
        const presentUser = await User.findById(req.body.id);

        if (presentUser.following.includes(req.params.id)) {
            await toBeUnFollowed.updateOne({
                $pull: { followers: req.body.id }
            });

            await presentUser.updateOne({
                $pull: { following: req.params.id }
            });
        } else {
            res.status(403).json("you are not following this user");
        }

        res.status(200).json("unfollowing the user");
    } catch (error) {
        next(error);
    }

}

module.exports = { getUser, updateUser, deleteUser, follow, unfollow };