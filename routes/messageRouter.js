const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// Create Message
router.post("/:senderId/:recipientId", messageController.createMessage);
//retreive message
router.get("/", messageController.getMessage);

module.exports = router;
