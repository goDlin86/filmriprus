import { sql } from '@vercel/postgres'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) return Response.json({ error: 'Invalid token' }, { status: 401 })

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

  try {
    data.items.map(async film => await sql`
      INSERT INTO filmriprus (kinopoiskid, name, posterurl, premiere)
      VALUES (${film.kinopoiskId}, ${film.nameRu}, ${film.posterUrl}, ${film.premiereRu})
      ON CONFLICT (kinopoiskId) DO NOTHING
    `)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }

  return Response.json(data)
}
