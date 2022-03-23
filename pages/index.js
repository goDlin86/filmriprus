import Head from 'next/head'
import { useEffect, useState } from 'react'
import FilmDescription from '../components/FilmDescription'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [films, setFilms] = useState([])

  useEffect(() => {
    async function fetchFilms() {
      const res = await fetch('api/getFilms')
      const data = await res.json()

      const filmsByDate = data.reduce((result, item) => {
        const i = result.findIndex(r => r.day === item[0])
        if (i >= 0) {
            result[i].films.push(item)
        } else {
            result.push({ day: item[0], films: [item] })
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
        <div className={styles.date}>Март 2022</div>
      </div>

      <main className={styles.main}>
        {films.map((date, i) => (
          <div key={i}>
            <div className={styles.day}>{new Date(date.day).toLocaleDateString('ru-Ru', { day: 'numeric', weekday: 'long' })}</div>
            <div className={styles.films_container}>
              {date.films.map((film, j) => (
                <div className={styles.film} key={j}>
                  <a href={`https://kinopoisk.ru/film/${film[2]}`} target='_blank' rel='noreferrer'>
                    <h1>{film[1]}</h1>
                  </a>
                  <img alt={film[1]} src={film[3]} />
                  <FilmDescription id={film[2]} />
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
