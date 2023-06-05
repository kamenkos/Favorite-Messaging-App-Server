const Chat = require("../models/chatModel");

// Create a new chat
exports.createChat = async (user1Id, user2Id) => {
  try {
    const chat = await Chat.create({ user1: user1Id, user2: user2Id });
    return chat;
  } catch (error) {
    throw new Error("Error creating chat");
  }
};

// Get a chat by users
exports.getChatByUsers = async (user1Id, user2Id) => {
  try {
    const chat = await Chat.findOne({
      $or: [
        { user1: user1Id, user2: user2Id },
        { user1: user2Id, user2: user1Id },
      ],
    });
    return chat;
  } catch (error) {
    throw new Error("Error getting chat");
  }
};

// Add a message to a chat
exports.addMessageToChat = async (chatId, message) => {
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    chat.messages.push(message);
    await chat.save();

    return chat;
  } catch (error) {
    throw new Error("Error adding message to chat");
  }
};
