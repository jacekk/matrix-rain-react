import * as React from 'react';

import { COL_SIZE, ROW_SIZE } from '../constants';
import { range } from '../utils';

import Column from './Column';

class Rain extends React.Component {
    state = {
        colsAmount: 0,
        rowsAmount: 0,
        columns: [],
    };

    componentDidMount() {
        this.calculateAmounts();
    }

    calculateAmounts() {
        let rowsAmount = Math.floor(window.innerHeight / ROW_SIZE);
        let colsAmount = Math.floor(window.innerWidth / COL_SIZE);

        // Limited for now, 'cause it lags as hell :(
        rowsAmount = 10;
        colsAmount = 10;

        this.setState({ colsAmount, rowsAmount });
    }

    renderColumns() {
        const { colsAmount, rowsAmount } = this.state;

        return range(colsAmount).map(index => (
            <Column
                key={index}
                index={index}
                rowsAmount={rowsAmount}
            />
        ));
    }

    render() {
        return (
            <div className="rain">
                {this.renderColumns()}
            </div>
        );
    }
}

export default Rain;
