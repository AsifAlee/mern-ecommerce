const express = require("express");
const errorMiddleware = require("./middlewares/error");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: "http://localhost:8081",
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  next();
});
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
