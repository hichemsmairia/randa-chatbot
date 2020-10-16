const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');
query = "creme+homme+peau"
const baseURL = 'https://www.pharma-shop.tn';  
const searchURL = `/recherche?controller=search&orderby=position&orderway=desc&search_query=${query}&submit_search=`;



const getProducts = async () => {  
  const html = await rp(baseURL + searchURL);
  const productsMap = cheerio('a.product-name', html).map(async (i, e) => {
    const link = e.attribs.href;
    
    const innerHtml = await rp(link);
    const name = cheerio('h1', innerHtml).text();
    const price = cheerio('#our_price_display',innerHtml).first().text()
    const image = cheerio('img#bigpic', innerHtml).attr('src');

    console.log(name)
    console.log(price)
      console.log(image)   
      console.log(link)

    return {
       
      price,
      link,
      name,
      image
    }
  }).get();
  return Promise.all(productsMap);
};

getProducts()  
  .then(result => {
    console.log(result)
    const transformed = new otcsv(result);
    return transformed.toDisk('./output.csv');
  })
  .then(() => console.log('operation de scraping est terminé avec success'))
  .catch((err) => console.error(err));