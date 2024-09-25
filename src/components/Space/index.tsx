import clsx from 'clsx';
import React from 'react';
import './index.scss';
import { ConfigContext } from './ConfigProvider';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;
    size?: SizeType | [SizeType, SizeType];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}

const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
}

const getNumberSize = (size: SizeType) => {
    return typeof size === 'string' ? spaceSize[size] : size || 0
}

const Space: React.FC<SpaceProps> = (props) => {
    const { space } = React.useContext(ConfigContext);
    const {
        className,
        style,
        children,
        size = space?.size || 'small',
        direction = 'horizontal',
        align,
        split,
        wrap = false,
        ...otherProps
    } = props;

    const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align

    const cn = clsx(
        'space',
        `space-${direction}`,
        {
            [`space-align-${mergedAlign}`]: mergedAlign,
        },
        className,
    )

    const childNodes = React.Children.toArray(props.children)
    const nodes = childNodes.map((child, index) => {
        const key = child && (child as React.ReactElement).key || `space-item-${index}`
        return (
            <>
                <div className='space-item' key={key}>
                    {child}
                </div>
                {index < childNodes.length && split && (
                    <span className={`${className}-split`} style={style}>
                        {split}
                    </span>
                )}
            </>
        )
    })

    const otherStyles: React.CSSProperties = {};

    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
            ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item =>
                getNumberSize(item),
            ),
        [size]
    );

    otherStyles.columnGap = horizontalSize;
    otherStyles.rowGap = verticalSize;

    if (wrap) otherStyles.flexWrap = 'wrap'

    return <div
        className={cn}
        style={otherStyles}
        {...otherProps}
    >
        {nodes}
    </div>
}

export default Space