import styles from '../styles/Home.module.css'

const TorrentsView = ({ torrents }) => {
  return (
    <div className={styles.torrents}>
      {torrents.map(t => (
        <>
          <a className={styles.link} href={'https://rutracker.org/forum/' + t.href}>{t.title}</a>
          <a href={'https://rutracker.org/forum/' + t.dlhref}>{t.size}</a>
        </>
      ))}
    </div>
  )
}

export default TorrentsView