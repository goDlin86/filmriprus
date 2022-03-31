import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import styles from '../styles/DateControl.module.css'

const DateControl = ({ date, setDate }) => {

  const weekStart = date.startOf('week').format('D MMMM YYYY')
  const weekEnd = date.endOf('week').format('D MMMM YYYY')

  const changeDate = (i) => {
    setDate(date.add(i, 'week'))
  }

  return (
    <div className={styles.date}>
      <div className={styles.button} onClick={() => changeDate(-1)}>&#60;</div>
      {`${weekStart} - ${weekEnd}`}
      <div className={styles.button} onClick={() => changeDate(1)}>&#62;</div>
    </div>
  )
}

export default DateControl