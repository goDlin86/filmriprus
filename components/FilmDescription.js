import { useState } from 'react'
import FilmHeader from './FilmHeader'
import TorrentsView from './TorrentsView'
import styles from '../styles/Home.module.css'

const FilmDescription = ({ id }) => {
  const [show, setShow] = useState(false)
  const [tab, setTab] = useState('desc')
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

      setDesc(data)
    }
  }

  const clickHeader = async (active) => {
    setTab(active)

    if (active === 'torrents' && !torrents) {
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
            <FilmHeader desc={desc} />
            <div className={styles.descheader}>
              <div className={tab === 'desc' ? styles.active : null} onClick={() => clickHeader('desc')}>Описание</div>
              <div className={tab === 'torrents' ? styles.active : null} onClick={() => clickHeader('torrents')}>Torrents</div>
            </div>
            <div className={styles.desccontainer}>
              {tab === 'desc' ? 
                desc.description : 
                torrents ? <TorrentsView torrents={torrents} /> : 'Загрузка'
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