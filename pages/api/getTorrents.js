//import RutrackerApi from 'rutracker-api'
import Rutracker from '../../lib/rutracker'

export default async (req, res) => {
  //const { year, month } = req.query

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

  const rutrack = new Rutracker()
  rutrack.login(process.env.RUTRACKER_LOGIN, process.env.RUTRACKER_PASSWORD)
}