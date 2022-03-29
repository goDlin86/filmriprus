import request from 'request'

export default async (req, res) => {
  //const { q } = req.query

  // try {
  //   const rutracker = new RutrackerApi()
  //   await rutracker.login({ username: process.env.RUTRACKER_LOGIN, password: process.env.RUTRACKER_PASSWORD })
  //   const torrents = await rutracker.search({ query: 'Отец Father', sort: 'size' })
  //   console.log(torrents)
  //   res.status(200).json(torrents)
  // }
  // catch (e) {
  //   console.log(e)
  // }

  const options = {
    url: 'http://rutracker.org/forum/login.php', 
    form: {
      login_username: process.env.RUTRACKER_LOGIN,
      login_password: process.env.RUTRACKER_PASSWORD,
      login: 'Вход' //'%C2%F5%EE%E4'
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
      console.log(cookie)

      const options = {
        url: 'http://rutracker.org/forum/tracker.php',
        form: {
          nm: 'Отец Father',
          o: '4', //sort downloads
          s: '1' //asc order
        },
        responseType: 'arraybuffer',
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          'Cookie': cookie, //+ ' opt_js={%22only_new%22:2}',
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
          'Content-Type': 'application/json; application/octet-stream; application/x-www-form-urlencoded'
        }
      }

      request.post(options, (error, response, body) => {
        if (error) {
          console.log(error)
        } else {
          console.log(response.data)
          res.status(200).json(response.data)
        }
      })
    }
})
}