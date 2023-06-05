const mongoose = require("mongoose");
const User = require("./userModel");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      type: String,
    },
    recipient: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      // required: true,
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
