const OnStar = require("onstarjs");
var express = require("express");
var app = express();
const config = {
  deviceId: "e81b6ad4-2860-11ec-9621-0242ac130002",
  vin: process.env.SECRET,
  username: process.env.USER,
  password: process.env.PASS,
  onStarPin: process.env.PIN,

  // Optional
  checkRequestStatus: false, // When false, requests are complete when 'In Progress' (Much faster).
  requestPollingIntervalSeconds: 6, // When checkRequestStatus is true, this is how often status check requests will be made
  requestPollingTimeoutSeconds: 60 // When checkRequestStatus is true, this is when requests while polling are considered timed out
};
const startItUp = async () => {
 await onStar.start();
  console.log("Command sent");
};
var onStar = OnStar.create(config);

app.get("/flash", function(req, res) {
  console.log("Sending flash command");
  onStar
    .alert({
      action: ["Flash"]
    })
    .then(() => {
      console.log("Sent flash command");
    })
    .catch(e => console.log(e));
  res.send("Hello World");
});

app.get("/start", function(req, res) {
  console.log("Sending start command");
  startit();
  res.send("Hello World");
});

app.get("/stop", function(req, res) {
  console.log(onStar.diagnostics());
  res.send(onStar.diagnostics());
});
async function startit() {
  await console.log(onStar.diagnostics());
}
app.listen(3000);
