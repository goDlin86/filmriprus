import styles from '../styles/Home.module.css'

const TorrentsView = ({ torrents }) => (
  <>
    {torrents.length > 0 ? 
      <div className={styles.torrents}>
        {torrents.map(t => (
          <>
            <a className={styles.link} href={'https://rutracker.org/forum/' + t.href}>{t.title}</a>
            <a href={'https://rutracker.org/forum/' + t.dlhref}>{t.size}</a>
          </>
        ))}
      </div> : 
      'Не найдено'
    }
  </>
)

export default TorrentsView