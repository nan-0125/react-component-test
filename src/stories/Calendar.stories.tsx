import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Calendar, { CalendarProps } from '../components/Calendar';
import dayjs from 'dayjs';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Calendar',
    component: Calendar,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: '',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
      argTypes: {
        value: { control: 'date' },
        defaultValue: { control: 'date' }
      },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    //   args: { onClick: fn() },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: CalendarProps) => {
    if(typeof args.value === 'number') {
        return <Calendar {...args} value={dayjs(new Date(args.value))} />
    }
    return <Calendar {...args} />
}

export const Default: Story = {
    args: {
        defaultValue: dayjs()
    },
    render
}

export const Value: Story = {
    args: {
        value: dayjs('2023-11-08'),
    },
    render
}

export const DateRender: Story = {
    args: {
        value: dayjs('2023-11-08'),
        dateRender: (currentDate) => <div>{currentDate.format('YYYY-MM-DD')}</div>
    },
    render
}

export const DateInnerContent: Story = {
    args: {
        value: dayjs(),
        dateInnerContent(currentDate) {
            return <div>{currentDate.format('YYYY-DD-MM')}</div>
        },
    },
    render
}

export const Locale: Story = {
    args: {
        value: dayjs('2023-11-08'),
        locale: 'en-US'
    },
    render
};
