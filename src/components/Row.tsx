import * as React from 'react';

export interface RowProps {
    char: string;
    color: string;
    index: number;
    transformation: string;
}

const Row = (props: RowProps) => {
    const { char, transformation, color } = props;
    const classes = ['row', transformation].join(' ').trim();

    return (
        <div
            className={classes}
            style={{ color }}
        >
            {char}
        </div>
    );
};

export default Row;
