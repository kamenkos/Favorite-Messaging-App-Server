// // Define custom error handling middleware
// const errorHandler = (err, req, res, next) => {
//   // Check for specific error types and handle them accordingly
//   if (err.name === "ValidationError") {
//     // Handle Mongoose validation errors
//     const errors = Object.values(err.errors).map((error) => error.message);
//     return res.status(400).json({ error: errors });
//   }

//   // Handle other types of errors
//   // You can add more if statements to handle specific error types

//   // Default error handling
//   return res.status(500).json({ error: "Internal Server Error" });
// };
// module.exports = errorHandler;
