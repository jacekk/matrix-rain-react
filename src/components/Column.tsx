import * as React from 'react';

import { generateRandomChar, range } from '../utils';
// import {
//     TRANSFORMATIONS,
//     TransformationsTypes,
// } from '../constants';

import Row from './Row';

// const SMOOTH: number = 5; // check stepBegin and stepEnd after any modification

interface ColumnProps {
    index: number; // remove at the end
    rowsAmount: number;
}

class Column extends React.Component<ColumnProps, {}> {
    rows: Row[];

    state = {
        begin: 0,
        length: 0,
        rows: [],
    };

    renderRows() {
        return range(this.props.rowsAmount).map(index => (
            <Row
                key={index}
                char={generateRandomChar()}
            />
        ));
    }

    render() {
        return (
            <div className="column">
                {this.renderRows()}
            </div>
        );
    }
}

export default Column;
