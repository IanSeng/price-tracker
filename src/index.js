import getData from "./priceData/index";
const cheerio = require('cheerio');

getData()
  .then((result) => {
    //data = result;
    //console.log(result);
    const $ = cheerio.load(result);
    //console.log($.html);
    console.log($('.screenReaderOnly_3anTj').text())
  })
  .catch((error) => {
    console.log(error);
});


