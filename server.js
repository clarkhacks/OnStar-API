const OnStar = require("onstarjs");
var express = require("express");
var app = express();
const config = {
  deviceId: "e81b6ad4-2860-11ec-9621-0242ac130002",
  vin: process.env.SECRET,
  username: process.env.USER,
  password: process.env.PASS,
  onStarPin: process.env.PIN,
  checkRequestStatus: false, // When false, requests are complete when 'In Progress' (Much faster).
  requestPollingIntervalSeconds: 6, // When checkRequestStatus is true, this is how often status check requests will be made
  requestPollingTimeoutSeconds: 60 // When checkRequestStatus is true, this is when requests while polling are considered timed out
};
var onStar = OnStar.create(config);

// start engine

app.get("/ignition", function(req, res) {
  console.log("Sending start command");
  startVehicle();
  res.send("Command Sent");
});

// stop engine
app.get("/kill", function(req, res) {
  killVehicle();
  res.send("Command Sent");
});
// flash alert
app.get("/flash", function(req, res) {
  alertVehicle("Flash");
  res.send("Command Sent");
});
// honk alert
app.get("/honk", function(req, res) {
  alertVehicle("Honk");
  res.send("Command Sent");
});
// lock
app.get("/lock", function(req, res) {
  lockVehicle();
  res.send("Command Sent");
});
// unlock
app.get("/unlock", function(req, res) {
  unlockVehicle();
  res.send("Command Sent");
});
// vehicle info
app.get("/info", function(req, res) {
  getDiagnostics();
  res.send("Command Sent");
});
// asyn functions
async function startVehicle() {
  try {
    console.log(await onStar.start());
  } catch (e) {
    console.log("that failed", e);
  }
}
async function killVehicle() {
  try {
    console.log(await onStar.cancelStart());
  } catch (e) {
    console.log("that failed", e);
  }
}
async function alertVehicle(a) {
  try {
    console.log(await onStar.alert([a]));
  } catch (e) {
    console.log("that failed", e);
  }
}
async function lockVehicle() {
  try {
    console.log(await onStar.lockDoor());
  } catch (e) {
    console.log("that failed", e);
  }
}
async function unlockVehicle() {
  try {
    console.log(await onStar.unlockDoor());
  } catch (e) {
    console.log("that failed", e);
  }
}
async function getDiagnostics() {
  var options = [
    "ENGINE COOLANT TEMP",
    "ENGINE RPM",
    "LAST TRIP FUEL ECONOMY",
    "EV ESTIMATED CHARGE END",
    "EV BATTERY LEVEL",
    "OIL LIFE",
    "EV PLUG VOLTAGE",
    "LIFETIME FUEL ECON",
    "HOTSPOT CONFIG",
    "LIFETIME FUEL USED",
    "ODOMETER",
    "HOTSPOT STATUS",
    "TIRE PRESSURE",
    "AMBIENT AIR TEMPERATURE",
    "LAST TRIP DISTANCE",
    "FUEL TANK INFO",
    "HANDS FREE CALLING",
    "VEHICLE RANGE"
  ];

  try {
    console.log(await onStar.diagnostics(options));
  } catch (e) {
    console.log("that failed", e);
  }
}
app.listen(3000);
