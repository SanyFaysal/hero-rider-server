const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// stripe payment
app.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
app.post("/charge", async (req, res) => {
  try {
    console.log(req.body);
    const amount = req.body.amount || 20000; // Amount in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// import routes
// const jobRoute = require('./routes/job.route');
const userRoute = require("./routes/user.route");

// routes
app.get("/", (req, res) => {
  202;
  res.send("Route is working! YaY!");
});

// app.use('/api/v1', jobRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
