const Message = require("../models/messageModel");

// Create Message
exports.createMessage = async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const { content } = req.body;
    // You can add additional validation or checks here

    // Create a new message instance
    const newMessage = new Message({
      senderId,
      recipientId,
      content,
      newMessage: Date.now(),
    });
    console.log(newMessage);

    // Save the message to the database
    newMessage
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Message saved successfully",
          newMessage: newMessage,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Error saving message",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Error saving mesage" });
  }
};

// Retreive Message
exports.getMessage = async (req, res) => {};
