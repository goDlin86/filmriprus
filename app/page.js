'use client'

import { useEffect, useState } from 'react'
import DateControl from '../components/DateControl'
import FilmDescription from '../components/FilmDescription'

import styles from '../styles/Home.module.css'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export default function Page() {
    const [films, setFilms] = useState([])
    const [date, setDate] = useState(dayjs())

    useEffect(() => {
        async function fetchFilms() {
            const dateStart = date.startOf('week').format('YYYY-MM-DD')
            const dateEnd = date.endOf('week').format('YYYY-MM-DD')
        
            const res = await fetch(`api/getFilms?dateStart=${dateStart}&dateEnd=${dateEnd}`)
            const data = await res.json()
        
            const filmsByDate = data.reduce((result, item) => {
                const i = result.findIndex(r => r.day === item.premiere)
                if (i >= 0) {
                    result[i].films.push(item)
                } else {
                    result.push({ day: item.premiere, films: [item] })
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
                                <img alt={film.name} src={film.posterurl} />
                                <a href={`https://kinopoisk.ru/film/${film.kinopoiskid}`} target='_blank' rel='noreferrer'>
                                <h1>{film.name}</h1>
                                </a>
                                <FilmDescription id={film.kinopoiskid} />
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