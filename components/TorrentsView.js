import styles from '../styles/Home.module.css'

const TorrentsView = ({ torrents }) => {
  return (
    <div className={styles.torrents}>
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