var express = require("express");
var { MessengerClient } = require("messaging-api-messenger");
var constants = require("./messengerConstants");

const client = new MessengerClient({
  accessToken: constants.token,
  // appId: appId,
  // appSecret: appSecret,
  // skipAppSecretProof: true,
});

module.exports = client;
