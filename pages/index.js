import Head from 'next/head'
import { useEffect, useState } from 'react'
import FilmDescription from '../components/FilmDescription'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import styles from '../styles/Home.module.css'

export default function Home() {
  const [films, setFilms] = useState([])
  const [date, setDate] = useState(dayjs())

  useEffect(() => {
    async function fetchFilms() {
      const dateStart = date.endOf('week').toISOString().slice(0, -5)
      const dateEnd = date.startOf('week').toISOString().slice(0, -5)

      const res = await fetch(`api/getFilms?dateStart=${dateStart}&dateEnd=${dateEnd}`)
      const data = await res.json()

      const filmsByDate = data.reduce((result, item) => {
        const i = result.findIndex(r => r.day === item.premiereRu)
        if (i >= 0) {
            result[i].films.push(item)
        } else {
            result.push({ day: item.premiereRu, films: [item] })
        }
        return result
      }, [])

      setFilms(filmsByDate)
    }

    fetchFilms()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>FILMrip</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="icon" href="/movie.svg" />
      </Head>

      <div className={styles.header}>
        <div className={styles.logo}></div>
        FILMrip
        <div className={styles.date}>{date.format('MMMM YYYY')}</div>
      </div>

      <main className={styles.main}>
        {films.map((date, i) => (
          <div key={i}>
            <div className={styles.day}>{new Date(date.day).toLocaleDateString('ru-Ru', { day: 'numeric', weekday: 'long' })}</div>
            <div className={styles.films_container}>
              {date.films.map((film, j) => (
                <div className={styles.film} key={j}>
                  <img alt={film.nameRu} src={film.posterUrl} />
                  <a href={`https://kinopoisk.ru/film/${film.kinopoiskId}`} target='_blank' rel='noreferrer'>
                    <h1>{film.nameRu}</h1>
                  </a>
                  <FilmDescription id={film.kinopoiskId} />
                </div>
              ))}
              <div className={styles.empty}></div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
