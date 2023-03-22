const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));
// import routes
// const jobRoute = require('./routes/job.route');
const userRoute = require("./routes/user.route");

// routes
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// app.use('/api/v1', jobRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
