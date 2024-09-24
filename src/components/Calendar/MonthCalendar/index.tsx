import React, { useContext } from 'react'
import './index.scss'
import type { CalendarProps } from '..';
import type { Dayjs } from 'dayjs';
import clsx from 'clsx';
import LocaleContext from '../LocaleContext';
import allLocales from '../locale';

interface MonthCalendarProps extends CalendarProps {
    selectHandler?: (date: Dayjs) => void;
    curMonth: Dayjs
}

interface DayInfo {
    date: Dayjs,
    currentMonth: boolean
}

const getAllDays = (date: Dayjs) => {

    // const daysCount = date.daysInMonth()
    const startDate = date.startOf('month')
    const startDay = startDate.day() === 0 ? 6 : startDate.day() - 1

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

const renderDays = (
    daysInfo: DayInfo[],
    dateRender: MonthCalendarProps['dateRender'],
    dateInnerContent: MonthCalendarProps['dateInnerContent'],
    value: MonthCalendarProps['value'],
    selectHandler: MonthCalendarProps['selectHandler']
) => {
    const rows = []
    for (let i = 0; i < 6; i++) {
        const row = []
        for (let j = 0; j < 7; j++) {
            const item = daysInfo[i * 7 + j]
            row[j] = (
                <div
                    key={j}
                    className={clsx('calendar-month-body-cell', {
                        'calendar-month-body-cell-current': item.currentMonth
                    })}
                    onClick={() => selectHandler?.(item.date)}
                >
                    {dateRender ? dateRender(item.date) :
                        <div className='calendar-month-body-cell-date'>
                            <div className={clsx("calendar-month-cell-body-date-value", {
                                "calendar-month-body-cell-date-selected": value?.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                            })}>
                                {item.date.date()}
                            </div>
                            <div className="calendar-month-cell-body-date-content">{dateInnerContent?.(item.date)}</div>
                        </div>
                    }
                </div>
            )
        }
        rows.push(<div key={i} className="calendar-month-body-row">{row}</div>)
    }
    return rows
}

const MonthCalendar: React.FC<MonthCalendarProps> = (props) => {
    const localeContext = useContext(LocaleContext);
    const CalendarLocale = allLocales[localeContext.locale];
    const { value, dateRender, dateInnerContent, selectHandler, curMonth } = props
    const weekList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const allDays = getAllDays(curMonth)
    return (
        <div className="calendar-month">
            <div className="calendar-month-week-list">
                {weekList.map(week => (
                    <div className="calendar-month-week-list-item" key={week}>{CalendarLocale.week[week]}</div>
                ))}
            </div>
            <div className="calendar-month-body">
                {renderDays(allDays, dateRender, dateInnerContent, value, selectHandler)}
            </div>
        </div>
    )
}

export default MonthCalendar