const TeleSignSDK = require("telesignsdk");

const customerId =
  process.env.CUSTOMER_ID || "2C4DB059-1E72-4AF2-AF3B-434BD7E9D618";
const apiKey =
  process.env.API_KEY ||
  "5j24v/P0EdfRZJbJwPo+TACTvQvstqjHpnOB3rGOqbj8tW4iJVGXiBju3iqOIZBY+aTHutzEVw22voJjh5D8Ig==";
const client = new TeleSignSDK(customerId, apiKey);

function sendSMS(toNumber, message, messageType = "ARN", callback) {
  const printResponse = (error, responseBody) => {
    if (error === null) {
      callback(null, responseBody);
    } else {
      callback(error);
    }
  };
  client.sms.message(printResponse, toNumber, message, messageType);
}

module.exports = { sendSMS };
