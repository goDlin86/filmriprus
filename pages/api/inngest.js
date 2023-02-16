import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'filmriprus' })

const getFilms = inngest.createFunction(
  { name: 'Get films' }, 
  { cron: '0 12 * * 3' }, 
  async ({ event, step }) => {
    const month = new Date().toLocaleString('en-EN', { month: 'long' })
    const year = new Date().getFullYear()
    const res = await fetch(`https://filmriprus.vercel.app/api/filmsdb?year=${year}&month=${month}&secret=` + process.env.FILMRIP_TOKEN)
    return await res.json()
  }
)

export default serve(inngest, [ getFilms ])