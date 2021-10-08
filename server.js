const OnStar = require("onstarjs");
function runIt() {

const config = {
  deviceId: "e81b6ad4-2860-11ec-9621-0242ac130002",
  vin: process.env.SECRET,
  username: process.env.USER,
  password: process.env.PASS,
  onStarPin: process.env.PIN,

  // Optional
  checkRequestStatus: false, // When false, requests are complete when 'In Progress' (Much faster).
  requestPollingIntervalSeconds: 6, // When checkRequestStatus is true, this is how often status check requests will be made
  requestPollingTimeoutSeconds: 60, // When checkRequestStatus is true, this is when requests while polling are considered timed out
};

const onStar = OnStar.create(config);
console.log("made it here");
onStar
  .alert({
    action: ["Honk"],
  })
  .then(() => {
    onStar.start
console.log("made it here now");
  
  })
  .catch(e => console.log(e));
}

// runIt();