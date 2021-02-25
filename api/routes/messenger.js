var express = require("express");
var router = express.Router();

var webhookRouter = require("./messengerRoutes/webhook");
var messengerRequests = require("./messengerRoutes/messengerRequests");
// var { MessengerClient } = require("messaging-api-messenger");
// var constants = require("./messengerRoutes/messengerConstants");

// const client = new MessengerClient({
//   accessToken: constants.token,
//   // appId: appId,
//   // appSecret: appSecret,
//   // skipAppSecretProof: true,
// });

// client.setWhitelistedDomains([
//   "https://www.freestand.in/",
//   "https://www.google.com",
// ]);

// client.setGetStarted("GET_STARTED_PAYLOAD");

// client.setPersistentMenu([
//   {
//     locale: "default",
//     callToActions: [
//       {
//         type: "postback",
//         title: "Hi",
//         payload: "SAY_HI",
//       },
//       {
//         type: "web_url",
//         title: "Visit our Site",
//         url: "https://www.freestand.in/",
//       },
//     ],
//   },
// ]);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Facebook Messenger Webhook API");
});

//Facebook messenger webhook
router.use("/webhook", webhookRouter);
router.use("/messengerRequests", messengerRequests);

module.exports = router;
