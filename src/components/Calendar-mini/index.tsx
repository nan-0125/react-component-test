import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import clsx from 'clsx'

interface CalendarProps {
    value?: Date | undefined
    defaultValue?: Date,
    onChange?: (date: Date) => void
}

const daysOfAWeek = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '日',
]

const Calendar: React.FC<CalendarProps> = ({
    defaultValue = new Date(),
    value: propValue,
    onChange
}) => {
    const isFirstRender = useRef(true)
    const [stateValue, setStateValue] = useState<Date | undefined>(() => {
        if (propValue === undefined) {
            return defaultValue
        } else {
            return propValue
        }
    })

    const [dateOnView, setDateOnView] = useState(() => {
        if (stateValue === undefined) {
            const date = new Date()
            return {
                monthIndex: date.getMonth(),
                year: date.getFullYear()
            }
        } else {
            return {
                monthIndex: stateValue.getMonth(),
                year: stateValue.getFullYear()
            }
        }
    })

    const value = propValue ? propValue : stateValue

    const lastMonthHandler = () => setDateOnView(({ year, monthIndex }) => {
        const dateOfLastMonth = new Date(year, monthIndex - 1)
        return {
            monthIndex: dateOfLastMonth.getMonth(),
            year: dateOfLastMonth.getFullYear()
        }
    })
    const nextMonthHandler = () => setDateOnView(({ year, monthIndex }) => {
        const dateOfNextMonth = new Date(year, monthIndex + 1)
        return {
            monthIndex: dateOfNextMonth.getMonth(),
            year: dateOfNextMonth.getFullYear()
        }
    })

    const onClickDate = (date: Date) => {
        if (propValue === undefined) {
            setStateValue(date)
        }
        onChange?.(date)
    }

    const onClickNotCurrentMonth = (date: Date) => {
        setDateOnView({
            year: date.getFullYear(),
            monthIndex: date.getMonth()
        })
        onClickDate(date)
    }

    useEffect(() => {
        isFirstRender.current = false
        if (propValue === undefined && !isFirstRender.current) {
            setStateValue(propValue)
        }
    }, [propValue])

    const renderDays = () => {
        const elements = []
        const firstDay = new Date(dateOnView.year, dateOnView.monthIndex, 1).getDay()
        const leftDaysCountOfLastMonth = firstDay === 0 ? 6 : firstDay - 1
        const lastDayOfLastMonth = new Date(dateOnView.year, dateOnView.monthIndex, 0).getDate()
        const firstLeftDayOfLastMonth = lastDayOfLastMonth - (leftDaysCountOfLastMonth - 1)

        for (let day = firstLeftDayOfLastMonth; day <= lastDayOfLastMonth; day++) {
            const date = new Date(dateOnView.year, dateOnView.monthIndex - 1, day)
            elements.push(
                <div
                    onClick={() => onClickNotCurrentMonth(date)}
                    className="day-item last-month"
                    title={date.toLocaleDateString()}
                    key={date.toLocaleDateString()}
                >
                    {day}
                </div>)
        }

        const daysCountOfCurrentMonth = new Date(dateOnView.year, dateOnView.monthIndex + 1, 0).getDate()

        for (let day = 1; day <= daysCountOfCurrentMonth; day++) {
            const date = new Date(dateOnView.year, dateOnView.monthIndex, day)
            elements.push(
                <div
                    onClick={() => onClickDate(date)}
                    className={clsx("day-item", { "current-day": date.toLocaleDateString() === value?.toLocaleDateString() })}
                    title={date.toLocaleDateString()}
                    key={date.toLocaleDateString()}
                >
                    {day}
                </div>)
        }

        const leftDaysCountOfNextMonth = 42 - (daysCountOfCurrentMonth + leftDaysCountOfLastMonth)

        for (let day = 1; day <= leftDaysCountOfNextMonth; day++) {
            const date = new Date(dateOnView.year, dateOnView.monthIndex + 1, day)
            elements.push(
                <div
                    onClick={() => onClickNotCurrentMonth(date)}
                    className="day-item next-month"
                    title={date.toLocaleDateString()}
                    key={date.toLocaleDateString()}
                >
                    {day}
                </div>)
        }

        return elements
    }

    return (
        <div className="calendar-wrapper">
            <div className="header">
                <button onClick={lastMonthHandler}>&lt;</button>
                <div className="value">{dateOnView.year}年{dateOnView.monthIndex + 1}月</div>
                <button onClick={nextMonthHandler}>&gt;</button>
            </div>
            <div className="days-wrapper">
                <div className="days-header">
                    {daysOfAWeek.map(
                        day => <div key={day} className='day-item'>{day}</div>
                    )}
                </div>
                <div className="days-body">{renderDays()}</div>
            </div>
        </div>
    )
}

export default Calendar