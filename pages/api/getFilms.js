import faunadb, { query as q } from 'faunadb'

export default async (req, res) => {
  //const { year, month } = req.query

  const client = new faunadb.Client({ secret: process.env.DBSECRET })

  const data = await client.query(
    q.Paginate(
      q.Match(
        q.Index('films_by_date')
      )
    )
  )

  res.status(200).json(data.data)
}