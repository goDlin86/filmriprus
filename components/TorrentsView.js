import styles from '../styles/Home.module.css'

const TorrentsView = ({ torrents, show }) => {
  return (
    <div className={show ? `${styles.torrents} ${styles.visible}` : `${styles.torrents} ${styles.hidden}`}>
      {torrents.map((t, i) => (
        <div className={styles.torrent} key={i}>
          <a href={'https://rutracker.org/forum/' + t.href}>{t.title}</a>
          <a href={'https://rutracker.org/forum/' + t.dlhref}>{t.size}</a>
        </div>
      ))}
    </div>
  )
}

export default TorrentsView