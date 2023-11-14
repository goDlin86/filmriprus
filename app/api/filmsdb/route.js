import { NextResponse } from 'next/server'
import faunadb, { query as q } from 'faunadb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const year = searchParams.get('year')
  const month = searchParams.get('month')

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

  return NextResponse.json(films)
}
