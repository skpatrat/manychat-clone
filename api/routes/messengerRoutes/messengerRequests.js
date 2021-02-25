var express = require("express");
const client = require("./messengerClient");
var router = express.Router();

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
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
