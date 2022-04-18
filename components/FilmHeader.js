import styles from '../styles/Home.module.css'

const FilmHeader = ({ desc }) => (
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
)

export default FilmHeader