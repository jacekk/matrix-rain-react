import * as React from 'react';

import { range } from '../utils';

import Column from './Column';

const COL_SIZE: number = 14;
const ROW_SIZE: number = 18;
const STEP_INTV: number = 5e3;

class Rain extends React.Component {
    state = {
        colsAmount: 0,
        rowsAmount: 0,
        columns: [],
    };

    componentDidMount() {
        this.setEnvParams();
        this.initInterval();
    }

    setEnvParams() {
        const rowsAmount = Math.floor(window.innerHeight / ROW_SIZE);
        const colsAmount = Math.floor(window.innerWidth / COL_SIZE);

        this.setState({ colsAmount, rowsAmount });
    }

    initInterval() {
        const intvCallback = () => {
            // do step
        };

        setInterval(intvCallback, STEP_INTV);
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
