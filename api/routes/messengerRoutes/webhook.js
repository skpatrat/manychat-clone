var express = require("express");
var router = express.Router();

var client = require("./messengerClient");
var MongoClient = require("mongodb").MongoClient;

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

  var myJSON = null;

  console.log(JSON.stringify(messaging_events));

  //* Save bot
  MongoClient.connect(
    "mongodb://127.0.0.1:27017/manychat",
    function (err, dbClient) {
      if (err) throw err;

      var db = dbClient.db("manychat");

      db.collection("messenger_bot")
        .find()
        .toArray(function (err, res) {
          myJSON = res[0];
          console.log(["myJSON", JSON.stringify(myJSON)]);

          for (i = 0; i < messaging_events.length; i++) {
            e = req.body.entry[0].messaging[i];
            sender = e.sender.id;

            if (e.message) {
              if (e.message.quick_reply) {
                //* The message is a postback
                // text = JSON.stringify(e.postback);
                if (
                  myJSON.payloads[e.message.quick_reply.payload].quickReplies
                ) {
                  client["sendText"](
                    sender,
                    myJSON.payloads[e.message.quick_reply.payload].text,
                    {
                      quickReplies:
                        myJSON.payloads[e.message.quick_reply.payload]
                          .quickReplies,
                    }
                  );
                } else {
                  client["sendText"](
                    sender,
                    myJSON.payloads[e.message.quick_reply.payload].text
                  );
                }

                continue;
              }

              if (e.message && e.message.text) {
                //* The message is a text
                if (myJSON.textWatchlist[e.message.text]) {
                  if (
                    myJSON.payloads[myJSON.textWatchlist[e.message.text]]
                      .quickReplies
                  ) {
                    client["sendText"](
                      sender,
                      myJSON.payloads[myJSON.textWatchlist[e.message.text]]
                        .text,
                      {
                        quickReplies:
                          myJSON.payloads[myJSON.textWatchlist[e.message.text]]
                            .quickReplies,
                      }
                    );
                  } else {
                    client["sendText"](
                      sender,
                      myJSON.payloads[myJSON.textWatchlist[e.message.text]].text
                    );
                  }
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
            }
            if (e.postback) {
              // console.log(e.postback);
              if (myJSON.payloads[e.postback.payload]) {
                if (myJSON.payloads[e.postback.payload].quickReplies) {
                  client["sendText"](
                    sender,
                    myJSON.payloads[e.postback.payload].text,
                    {
                      quickReplies:
                        myJSON.payloads[e.postback.payload].quickReplies,
                    }
                  );
                } else {
                  client["sendText"](
                    sender,
                    myJSON.payloads[e.postback.payload].text
                  );
                }
              }
            }
          }
        });
    }
  );

  res.sendStatus(200);
});

module.exports = router;
