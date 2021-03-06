import { CSSTransition, TransitionGroup } from 'react-transition-group'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import styles from '../styles/DateControl.module.css'

const DateControl = ({ date, setDate }) => {

  const weekStart = date.startOf('week').format('D MMMM')
  const weekEnd = date.endOf('week').format('D MMMM')

  const diff = Math.ceil(date.diff(dayjs(), 'day') / 7)
  let week = ''
  if (diff === 0) {
    week = 'текущая неделя'
  } else if (diff > 0) {
    if (diff === 1) {
      week = 'следующая неделя'
    } else if (diff < 5) {
      week = `через ${diff} недели`
    } else {
      week = `через ${diff} недель`
    }
  } else {
    if (diff === -1) {
      week = 'прошлая неделя'
    } else if (diff > -5) {
      week = `${Math.abs(diff)} недели назад`
    } else {
      week = `${Math.abs(diff)} недель назад`
    }
  }

  const changeDate = (i) => {
    setDate(date.add(i, 'week'))
  }

  return (
    <div className={styles.date}>
      <div className={styles.button} onClick={() => changeDate(-1)}>&#60;</div>
      <TransitionGroup className={styles.period_container}>
        <CSSTransition 
          key={date}
          timeout={500}
          classNames='fade'
        >
          <div className={styles.period}>
            <div>{weekStart}</div>
            <div>{weekEnd}</div>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className={styles.week}>{week}</div>
      <div className={styles.button} onClick={() => changeDate(1)}>&#62;</div>
    </div>
  )
}

export default DateControl