import Head from 'next/head'
import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import DateControl from '../components/DateControl'
import FilmDescription from '../components/FilmDescription'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import ReactGA from 'react-ga4'
import styles from '../styles/Home.module.css'

ReactGA.initialize('G-ZDFM6LXWM7')

export default function Home() {
  const [films, setFilms] = useState([])
  const [date, setDate] = useState(dayjs())

  ReactGA.send('pageview')

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

    setFilms([])
    fetchFilms()
  }, [date])

  return (
    <div className={styles.container}>
      <Head>
        <title>FILMrip</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1117" />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel="icon" href="/movie.svg" />
        <link rel="mask-icon" href="/movie.svg" color="white" />
      </Head>

      <div className={styles.header}>
        <div className={styles.logo}></div>
        FILMrip
        <DateControl date={date} setDate={setDate} />
      </div>

      <main className={styles.main}>
        {films.length > 0 ? films.map((date, i) => (
          <div key={i}>
            <div className={styles.day}>{dayjs(date.day).format('D, dddd')}</div>
            <div className={styles.films_container}>
              <div className={styles.films}>
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
          </div>
        )) : 'Загрузка'}
      </main>
    </div>
  )
}
