import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import './index.scss'
import MonthCalendar from './MonthCalendar'
import dayjs, { Dayjs } from 'dayjs'
import Header from './Header'
import clsx from 'clsx'
import LocaleContext from './LocaleContext'
import { useControllableValue } from 'ahooks'

export interface CalendarProps {
    value?: Dayjs;
    defaultValue?: Dayjs;
    style?: CSSProperties;
    className?: string | string[];
    dateRender?: (currentDate: Dayjs) => ReactNode;
    dateInnerContent?: (currentDate: Dayjs) => ReactNode;
    locale?: string;
    onChange?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = (props) => {
    const {
        style,
        className,
        locale,
        onChange
    } = props
    // const [curValue, setCurValue] = useState<Dayjs>(value)
    const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
        defaultValue: dayjs()
    })
    const [curMonth, setCurMonth] = useState<Dayjs>(curValue)

    useEffect(() => {
        setCurMonth(curValue)
    }, [curValue])

    const selectHandler = (date: Dayjs) => {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }

    const prevMonthHandler = () => {
        setCurMonth(curMonth.subtract(1, 'month'))
    }

    const nextMonthHandler = () => {
        setCurMonth(curMonth.add(1, 'month'))
    }

    const todayHandler = () => {
        const today = dayjs(Date.now())
        setCurValue(today)
        setCurMonth(today)
        onChange?.(today)
    }

    return (
        <LocaleContext.Provider value={{
            locale: locale || navigator.language
        }}>
            <div className={clsx("calendar", className)} style={style}>
                <Header todayHandler={todayHandler} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} curMonth={curMonth} />
                <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
            </div>
        </LocaleContext.Provider>

    )
}

export default Calendar