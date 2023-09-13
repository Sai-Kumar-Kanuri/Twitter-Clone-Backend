const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { createTweet, deleteTweet, likeOrDislike, getAllTweets, getUserTweets, getExploreTweets } = require("../contollers/tweetController");

const router = express.Router();


router.post('/', verifyToken, createTweet);
router.delete('/:id', verifyToken, deleteTweet);
router.put("/:id/like", likeOrDislike);
router.get("/timeline/:id", getAllTweets);
router.get("/user/all/:id", getUserTweets);
router.get("/explore", getExploreTweets);




module.exports = router;
