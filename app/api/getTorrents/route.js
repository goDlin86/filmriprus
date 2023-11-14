import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import iconv from 'iconv-lite'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  let formData = new FormData()
  formData.append('login_username', process.env.RUTRACKER_LOGIN)
  formData.append('login_password', process.env.RUTRACKER_PASSWORD)
  formData.append('login', 'Вход')

  try {
    const r = await fetch('http://rutracker.org/forum/login.php', {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    })

    if (r.headers['set-cookie']) {
      const [cookie] = r.headers['set-cookie'][0].split(';')

      const formDatat = new FormData()
      formDatat.append('nm', q)
      formDatat.append('o', '4') //sort downloads
      formDatat.append('s', '2') //desc order

      const rt = await fetch('http://rutracker.org/forum/tracker.php', {
        method: 'POST',
        body: formDatat,
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
          'Cookie': cookie,
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0'
        }
      })

      const body1 = iconv.decode(Buffer.from(rt.body), 'win1251')
      var $ = cheerio.load(body1),
          topics = $('tr.hl-tr'),
          topicsArray = []
      for (let i = 0; i < topics.length; i++){
        let elem = topics.eq(i)

        let a = elem.find('a.tLink')
        let title = a.text()
        let href = a.attr('href')

        let aSize = elem.find('a.tr-dl')
        let size = aSize.text()
        let dlhref = aSize.attr('href')
        topicsArray.push({ title, href, size, dlhref })
      }
      
      return NextResponse.json(topicsArray.slice(0, 7))
    }
    else
    {
      return NextResponse.json({ error: 'failed to fetch data' })
    }
    

  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// const options = {
//   url: 'http://rutracker.org/forum/tracker.php',
//   encoding: null,
//   gzip: true,
//   form: {
//     nm: q,
//     o: '4', //sort downloads
//     s: '2' //desc order
//   },
//   headers: {
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Cookie': cookie,
//     'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0'
//   }
// }