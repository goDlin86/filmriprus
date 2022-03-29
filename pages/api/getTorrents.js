import request from 'request'
import * as cheerio from 'cheerio'
import iconv from 'iconv-lite'

export default async (req, res) => {
  const { q } = req.query

  const options = {
    url: 'http://rutracker.org/forum/login.php', 
    form: {
      login_username: process.env.RUTRACKER_LOGIN,
      login_password: process.env.RUTRACKER_PASSWORD,
      login: 'Вход'
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
      'Accept-Encoding': 'gzip, deflate, br'
    }
  }

  request.post(options, (error, response, body) => {
    if (error) {
      console.log(error)
    } else {
      const [cookie] = response.headers['set-cookie'][0].split(';')

      const options = {
        url: 'http://rutracker.org/forum/tracker.php',
        form: {
          nm: 'Отец The Father',
          o: '4', //sort downloads
          s: '1' //asc order
        },
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          'Cookie': cookie, //+ ' opt_js={%22only_new%22:2}',
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0'
        }
      }

      request.post(options, (error, response, body) => {
        if (error) {
          console.log(error)
        } else {
          const body1 = iconv.decode(Buffer.from(body), 'win1251')
          var $ = cheerio.load(body1),
              topics = $('tr[class="hl-tr"]'),
              topicsArray = []
          for (let i = 0; i < topics.length; i++){
            let elem = topics.eq(i)
            let a = elem.find('a.tLink')
            let title = a.text()
            let href = a.attr('href')
            topicsArray.push({ title, href })
          }
          
          console.log($.html())
          res.status(200).json(topicsArray)
        }
      })
    }
})
}