import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')
import styles from '../styles/DateControl.module.css'

const variants = {
  enter: (direction) => {
    return {
      transform: 'translateX(' + (direction > 0 ? '' : '-') + '100%)',
      opacity: 0
    }
  },
  center: {
    transform: 'translateX(0)',
    opacity: 1
  },
  exit: (direction) => {
    return {
        transform: 'translateX(' + (direction < 0 ? '' : '-') + '100%)',
        opacity: 0
    }
  }
}

const DateControl = ({ date, setDate }) => {
  const [direction, setDirection] = useState(true)

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
    setDirection(i)
  }

  return (
    <div className={styles.date}>
      <div className={styles.button} onClick={() => changeDate(-1)}>&#60;</div>
      <AnimatePresence initial={false} custom={direction} mode='wait'>
        <motion.div
          key={date}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
              transform: { type: 'ease-in-out', duration: 0.4 }
          }}
          className={styles.period_container}
        >
          <div className={styles.period}>
            <div>{weekStart}</div>
            <div>{weekEnd}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.week}>{week}</div>
      <div className={styles.button} onClick={() => changeDate(1)}>&#62;</div>
    </div>
  )
}

export default DateControl