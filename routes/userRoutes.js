const express = require("express");
const { getUser, updateUser, deleteUser, follow, unfollow } = require("../contollers/userController");
const verifyToken = require("../middleware/verifyToken");


const router = express.Router();

router.put("/:id", verifyToken, updateUser);

router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);

router.put("/follow/:id", verifyToken, follow);

router.put("/unfollow/:id", verifyToken, unfollow);




module.exports = router;