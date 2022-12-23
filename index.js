const https = require('https');
const cheerio = require('cheerio');

const getDowTickers = () => {
  https.get('https://en.wikipedia.org/wiki/Dow_Jones_Industrial_Average', (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const $ = cheerio.load(data);
      const tickers = $('table.wikitable tr td:nth-child(3) a').map((i, el) => $(el).text()).get();
      console.log(tickers);
    });
  }).on('error', (err) => {
    console.error(err);
  });
};

getDowTickers();
