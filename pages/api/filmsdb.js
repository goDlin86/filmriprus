import faunadb, { query as q } from 'faunadb'

export default async (req, res) => {
  const { year, month } = req.query

  const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.KPAPIKEY,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  const client = new faunadb.Client({ secret: process.env.DBSECRET })

  client.query(
    q.Map(
      data.items,
      q.Lambda(
        'film',
        q.Create(
          q.Collection('Films'),
          { data: q.Var('film') }
        )
      )
    )
  )

  res.status(200).json(data)
}
