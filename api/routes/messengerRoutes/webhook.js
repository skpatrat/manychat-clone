var express = require("express");
var router = express.Router();

var client = require("./messengerClient");

// var myJSON = require("./sample.json");

router.get("/", function (req, res) {
  if (req.query["hub.verify_token"] === "FreestandIsAmazing") {
    res.send(req.query["hub.challenge"]);
  } else {
    // console.log("GET: " + JSON.stringify(req));
  }
  res.send("Error, wrong token");
});

router.post("/", function (req, res) {
  messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {
    e = req.body.entry[0].messaging[i];
    sender = e.sender.id;

    if (e.message && e.message.text) {
      //* The message is a text
      text = e.message.text;

      if (myJSON.response[e.message.text]) {
        // client.sendText(sender, myJSON.response[e.message.text]);
        client["sendText"](sender, myJSON.response[e.message.text]);
        continue;
      }

      //   if (text === "hi") {
      //     client.sendText(sender, "Select a postback", {
      //       quickReplies: [
      //         {
      //           contentType: "text",
      //           title: "Red",
      //           payload: "RED_PAYLOAD",
      //         },
      //       ],
      //     });

      //     continue;
      //   }

      client.sendText(sender, "Say 'hi' to start :)");
    }
    if (e.postback) {
      //* The message is a postback
      text = JSON.stringify(e.postback);

      client.sendText(sender, "Postback received: " + text.substring(0, 200));

      continue;
    }
  }
  res.sendStatus(200);
});

module.exports = router;
