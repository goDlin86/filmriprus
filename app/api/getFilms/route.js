import { sql } from '@vercel/postgres'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const dateStart = searchParams.get('dateStart')
  const dateEnd = searchParams.get('dateEnd')

  try {
    const data = await sql`SELECT * FROM filmriprus WHERE premiere BETWEEN ${dateStart} AND ${dateEnd}`
    return Response.json(data.rows)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}
