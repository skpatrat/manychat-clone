var express = require("express");
const client = require("./messengerClient");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/", function (req, res) {
  res.send("GET: messengerRequests");
});

router.post("/", function (req, res) {
  try {
    data = req.body;

    if (data.command && data.command.name) {
      console.log(data.command);
      client[data.command.name](data.command.arguments);
      res.sendStatus(200);
    } else if (data.getRequest) {
      client[data.getRequest.function]().then(function (val) {
        console.log(val[0]);
        res.json(val);
      });
    } else if (data.deployBot) {
      //* Save bot
      MongoClient.connect(
        "mongodb://127.0.0.1:27017/manychat",
        function (err, client) {
          if (err) throw err;

          var db = client.db("manychat");

          db.collection("messenger_bot").drop(function (err, delOk) {
            db.collection("messenger_bot").insertOne(
              data.deployBot.payload,
              function (err, res) {
                if (err) throw err;
                console.log("Bot deployed!");
              }
            );
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
