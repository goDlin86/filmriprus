import { NextResponse } from 'next/server'
import faunadb, { query as q } from 'faunadb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const dateStart = searchParams.get('dateStart')
  const dateEnd = searchParams.get('dateEnd')

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

  return NextResponse.json(data.data.map(f => f.data))
}
