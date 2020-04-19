"use strict";

var _index = _interopRequireDefault(require("./priceData/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cheerio = require("cheerio");

var nodemailer = require("nodemailer");

require('dotenv').config();

function checkPrice() {
  (0, _index["default"])().then(function (result) {
    var $ = cheerio.load(result);
    var price = $(".screenReaderOnly_3anTj").text().toString();
    var priceRemovedDollarSign = price.replace(/[$]/g, '');
    var priceToFloat = parseFloat(priceRemovedDollarSign);
    console.log(priceToFloat);
    var desirePrice = 399.99;

    if (priceToFloat < desirePrice) {
      sendEmail(priceToFloat);
    } // var category = $('span').filter(function() {
    //     return $(this).text().trim().includes('$') ;
    //   }).next().text();
    // console.log(category)

  })["catch"](function (error) {
    console.log(error);
  });
}

function sendEmail(price) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ian.dev27@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });
  var mailOptions = {
    from: "ian.dev27@gmail.com",
    to: "ianseng@outlook.com",
    subject: "Price Drop",
    text: "The price of the item on tracking list is now ".concat(price)
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

checkPrice(); // setInterval(function () {
//   checkPrice();
// }, 1 * 60 * 1000);
// //console.log(process.env);