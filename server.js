import OnStar from "onstarjs";
function runIt() {

const config = {
  deviceId: "e81b6ad4-2860-11ec-9621-0242ac130002",
  vin: "",
  username: "foo@bar.com",
  password: "p@ssw0rd",
  onStarPin: "1234",

  // Optional
  checkRequestStatus: true, // When false, requests are complete when 'In Progress' (Much faster).
  requestPollingIntervalSeconds: 6, // When checkRequestStatus is true, this is how often status check requests will be made
  requestPollingTimeoutSeconds: 60, // When checkRequestStatus is true, this is when requests while polling are considered timed out
};

const onStar = OnStar.create(config);

onStar
  .alert({
    action: ["Flash"],
  })
  .then(() => {
    onStar.start();
  })
  .catch(e => console.log(e));
}