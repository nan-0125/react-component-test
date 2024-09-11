import React from 'react'
import './index.scss'
import type { CalendarProps } from '..';
import type { Dayjs } from 'dayjs';
import clsx from 'clsx';

interface MonthCalendarProps extends CalendarProps {

}

interface DayInfo {
    date: Dayjs,
    currentMonth: boolean
}

const getAllDays = (date: Dayjs) => {
    // const daysCount = date.daysInMonth()
    const startDate = date.startOf('month')
    const startDay = startDate.day() === 0 ? 6 : startDate.day()

    const daysInfo: DayInfo[] = new Array(6 * 7)

    for (let index = 0; index < startDay; index++) {
        daysInfo[index] = {
            date: startDate.subtract(startDay - index, 'day'),
            currentMonth: false
        }
    }

    for (let index = startDay; index < daysInfo.length; index++) {
        const calcDate = startDate.add(index - startDay, 'day')
        daysInfo[index] = {
            date: calcDate,
            currentMonth: date.month() === calcDate.month()
        }

    }

    return daysInfo
}

const renderDays = (daysInfo: DayInfo[]) => {
    const rows = []
    for (let i = 0; i < 6; i++) {
        const row = []
        for (let j = 0; j < 7; j++) {
            const item = daysInfo[i * 7 + j]
            row[j] = <div key={j} className={clsx('calendar-month-body-cell', {
                'calendar-month-body-cell-current': item.currentMonth
            })}>{item.date.date()}</div>
        }
        rows.push(<div key={i} className="calendar-month-body-row">{row}</div>)
    }
    return rows
}

const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
    const { value } = props
    const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const allDays = getAllDays(value)
    return (
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map(week => (
                    <div className="calendar-month-week-list-item" key={week}>{week}</div>
                ))}
            </div>
            <div className="calendar-month-body">
                {renderDays(allDays)}
            </div>
        </div>
    )
}

export default MonthCalendar