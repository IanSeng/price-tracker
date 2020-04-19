import getData from "./priceData/index";
const cheerio = require("cheerio");
var nodemailer = require("nodemailer");
require('dotenv').config()


function checkPrice() {
  getData()
  .then((result) => {
    const $ = cheerio.load(result);
    let price = $(".screenReaderOnly_3anTj").text().toString();
    let priceRemovedDollarSign = price.replace(/[$]/g, '')
    let priceToFloat = parseFloat(priceRemovedDollarSign)
    console.log(priceToFloat);
    let desirePrice = 399.99
    if (priceToFloat < desirePrice){
      sendEmail(priceToFloat);
    }
    
    // var category = $('span').filter(function() {
    //     return $(this).text().trim().includes('$') ;
    //   }).next().text();
    // console.log(category)
  })
  .catch((error) => {
    console.log(error);
  });

}

function sendEmail(price) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ian.dev27@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: "ian.dev27@gmail.com",
    to: "ianseng@outlook.com",
    subject: "Price Drop",
    text: `The price of the item on tracking list is now ${price}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

setInterval(function () {
  checkPrice();
}, 1 * 60 * 1000);
//console.log(process.env);

