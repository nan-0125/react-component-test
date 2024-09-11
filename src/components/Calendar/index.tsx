import type { CSSProperties, ReactNode } from 'react'
import './index.scss'
import MonthCalendar from './MonthCalendar'
import type { Dayjs } from 'dayjs'
import Header from './Header'
import clsx from 'clsx'

export interface CalendarProps {
    value: Dayjs;
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
        className
    } = props

    return (
        <div className={clsx("calendar", className)} style={style}>
            <Header />
            <MonthCalendar {...props} />
        </div>
    )
}

export default Calendar