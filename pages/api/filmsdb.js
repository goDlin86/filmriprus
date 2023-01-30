import faunadb, { query as q } from 'faunadb'

export default async (req, res) => {
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

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

  const films = await data.items.reduce(async (acc, v) => {
    const result = await client.query(
      q.Paginate(
        q.Match(
          q.Index('titles'),
          [v.nameRu, v.year]
        )
      )
    )

    if (result.data.length) {
      return acc
    }

    return (await acc).concat(v)
  }, [])

  client.query(
    q.Map(
      films,
      q.Lambda(
        'film',
        q.Create(
          q.Collection('Films'),
          { data: q.Var('film') }
        )
      )
    )
  )

  res.status(200).json(films)
}
