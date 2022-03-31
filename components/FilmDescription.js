import { useState } from 'react'
import TorrentsView from './TorrentsView'
import styles from '../styles/Home.module.css'

const FilmDescription = ({ id }) => {
  const [show, setShow] = useState(false)
  const [showTorrents, setShowTorrents] = useState(false)
  const [desc, setDesc] = useState(null)
  const [torrents, setTorrents] = useState(null)

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

  const clickHeader = async (show) => {
    setShowTorrents(show)

    if (show && !torrents) {
      const res = await fetch(`api/getTorrents?q=${desc.nameRu} ${desc.nameEn ?? ''} ${desc.nameOriginal ?? ''} ${desc.year}`)
      const data = await res.json()

      setTorrents(data)
    }
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
              <div>{desc.countries.slice(0, 2).map((c, i) => <div key={i}>{c.country}</div>)}</div>
              <div>{desc.genres.slice(0, 2).map((g, i) => <div key={i}>{g.genre}</div>)}</div>
              <div className={styles.year}>{desc.year}</div>
              <div>{desc.ratingKinopoisk ? <span className={desc.ratingKinopoisk > 6.5 ? styles.rating_green : styles.rating_yellow}>{desc.ratingKinopoisk}</span> : '-'}</div>
            </div>
            <div className={styles.descheader}>
              <div className={!showTorrents && styles.active} onClick={() => clickHeader(false)}>Описание</div>
              <div className={showTorrents && styles.active} onClick={() => clickHeader(true)}>Torrents</div>
            </div>
            <div className={styles.desccontainer}>
              {showTorrents ? 
                (torrents ? (torrents.length > 0 ? <TorrentsView torrents={torrents} /> : 'Не найдено') : 'Загрузка') :
                desc.description
              }
            </div>
          </>
          : 'Загрузка'}
      </div>
      <div className={styles.button} onClick={click}>{show ? 'Скрыть' : 'Подробнее'}</div>
    </div>
  )
}

export default FilmDescription