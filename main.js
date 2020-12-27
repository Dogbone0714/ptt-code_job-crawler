const request = require('request');
const cheerio = require('cheerio');

const CrontabPeriod = 60 * 60 * 24

request('https://www.ptt.cc/bbs/CodeJob/index.html', (err, res, body) => {
  var $ = cheerio.load(body)


  var list = $('.r-ent a').map((index, obj) => {
    return {
      title: $(obj).text(),
      link: $(obj).attr('href'),
      timestamp: $(obj).attr('href').substr(15, 10),
    }
  }).get()


  list = list.filter((post)=>{
    return post.timestamp > (Date.now() / 1000 - CrontabPeriod)
  })

  console.log(list);
})