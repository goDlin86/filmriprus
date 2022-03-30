import faunadb, { query as q } from 'faunadb'

export default async (req, res) => {
  const { dateStart, dateEnd } = req.query

  const client = new faunadb.Client({ secret: process.env.DBSECRET })

  const data = await client.query(
    q.Map(
      q.Paginate(
        q.Range(
          q.Match(
            q.Index('films_desc')
          ),
          dateStart || '', dateEnd || ''
        )
      ),
      q.Lambda((x, ref) => q.Get(ref))
    )
  )

  res.status(200).json(data.data.map(f => f.data))
}