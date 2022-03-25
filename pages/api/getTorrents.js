import RutrackerApi from 'rutracker-api-2'

export default async (req, res) => {
  //const { year, month } = req.query

  try {
    const rutracker = new RutrackerApi()
    const answer = await rutracker.getCaptcha()
    await rutracker.login(process.env.RUTRACKER_LOGIN, process.env.RUTRACKER_PASSWORD, answer)
    const torrents = await rutracker.search({ query: 'Отец Father', sort: 'size' })
    console.log(torrents)
    res.status(200).json(torrents)
  }
  catch (e) {
    console.log(e)
  }
}