import * as React from 'react';

export interface RowProps {
    char: string;
    color: string;
    index: number;
    transformation: string;
}

class Row extends React.Component<RowProps, {}> {
    render() {
        const { char, transformation, color } = this.props;
        const classes = ['row', transformation].join(' ').trim();

        return (
            <div
                className={classes}
                style={{ color }}
            >
                {char}
            </div>
        );
    }
}

export default Row;
