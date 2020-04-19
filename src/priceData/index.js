const request = require("request");

export default function getData() {
  var promise = new Promise((resolve, reject) => {
    request("https://www.bestbuy.ca/en-ca/product/starlink-battle-for-atlas-switch/12612458", function (error, response, html) {
      if (error) {
        reject(error);
      }
      console.log("statusCode:", response && response.statusCode); 
      resolve(html);
    });
  });
  return promise;
}
