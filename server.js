const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = require("./app");

dotenv.config({ path: "./config.env" });

////////////////////////////////////////////////////////////////////////

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASSWORD
).replace("<username>", process.env.DB_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
