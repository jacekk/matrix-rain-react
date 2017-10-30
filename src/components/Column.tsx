import * as React from 'react';

import Row, { RowProps } from './Row';

export interface ColumnProps {
    index?: number;
    rows: RowProps[];
}

export interface ColumnModel {
    begin: number;
    length: number;
    rows: RowProps[];
}

const Column = (props: ColumnProps) => (
    <div className="column">
        { props.rows.map(
            (row: RowProps, index: number) => (
                <Row {...row} key={index} />
            )
        ) }
    </div>
);

export default Column;
