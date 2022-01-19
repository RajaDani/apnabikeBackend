const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51KDpJHHUGbX5r7qEAXeRYQrzq81nBYb17C6Mqr3cVDuPDVRIeurYWNSm0aXWjcBRgt7SwMDreZptmMQEzLODPQQ000mGpZCdBq"
);

app.use(express.static("public"));
app.use(express.json());

async function paymentIntent(req, res) {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

module.exports = { paymentIntent };
