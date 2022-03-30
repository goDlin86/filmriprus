import { useState } from 'react'
import styles from '../styles/Home.module.css'

const FilmDescription = ({ id }) => {
  const [show, setShow] = useState(false)
  const [desc, setDesc] = useState(null)

  const click = async () => {
    setShow(!show)

    if (!desc) {
      const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_KPAPIKEY,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)

      setDesc(data)
    }
  }

  const searchTorrents = async () => {
    const res = await fetch(`api/getTorrents?q=${desc.nameRu} ${desc.nameEn ?? ''} ${desc.nameOriginal ?? ''} ${desc.year}`)
    const data = await res.json()

    console.log(data)
  }

  return (
    <div className={styles.more}>
      <div className={show ? `${styles.description} ${styles.visible}` : `${styles.description} ${styles.hidden}`}>
        {desc ? 
          <>
            <div className={styles.info}>
              <div className={styles.info_header}>Страна</div>
              <div className={styles.info_header}>Жанр</div>
              <div className={styles.info_header}>Год</div>
              <div className={styles.info_header}>Рейтинг</div>
              <div>{desc.countries.map((c, i) => <div key={i}>{c.country}</div>)}</div>
              <div>{desc.genres.map((g, i) => <div key={i}>{g.genre}</div>)}</div>
              <div className={styles.year}>{desc.year}</div>
              <div>{desc.ratingKinopoisk ? <span className={desc.ratingKinopoisk > 6.5 ? styles.rating_green : styles.rating_yellow}>{desc.ratingKinopoisk}</span> : '-'}</div>
            </div>
            <div onClick={searchTorrents}>Torrents</div>
            {desc.description}
          </>
          : 'Загрузка'}
      </div>
      <div className={styles.button} onClick={click}>{show ? 'Скрыть' : 'Подробнее'}</div>
    </div>
  )
}

export default FilmDescription