const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser")



//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
  console.log(`Error : ${err.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
})


dotenv.config({ path: "./config/config.env" });

mongoose
  .connect(process.env.DB_URI, {})
  .then(() => console.log("Database connected successfully"));

const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Available routes
app.use("/api/v1", require("./routes/venueRoute"));
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/orderRoute"));
app.use("/api/v1", require("./routes/bookmarksRoute"));


app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `PartyBeasts Backend listening on http://localhost:${process.env.PORT}`
  );
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
