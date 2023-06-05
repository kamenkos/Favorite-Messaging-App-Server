const express = require("express");
const app = express();
// const errorHandler = require("./middleware/errorHandler");

const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRouter");

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.use(errorHandler);
app.use("/api/v1/users", userRouter);

// Message route that will be used to create a new message. It will require sender id and, receiver id, and content.
app.use("/api/v1/messages", messageRouter);

module.exports = app;
