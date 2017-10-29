import * as React from 'react';

import {
    COLOR_SMOOTHNESS,
    STEP_INTV_IN_MS,
} from '../constants';
import {
    formatColor,
    generateRandomChar,
    getRandomTransformation,
    limitForRange,
    range,
} from '../utils';

import Row, { RowProps } from './Row';

interface ColumnProps {
    index: number;
    rowsAmount: number;
}

interface ColumnState {
    begin: number;
    length: number;
    rows: RowProps[];
}

class Column extends React.Component<ColumnProps, ColumnState> {

    state = {
        begin: 0,
        length: 0,
        rows: [],
    };

    private intv?: number;

    componentDidMount() {
        this.generateRows();
        this.startInterval();
    }

    generateRows() {
        const rows = range(this.props.rowsAmount).map(
            index => ({
                char: generateRandomChar(),
                color: '',
                index,
                transformation: '',
            } as RowProps)
        );

        this.setState({ rows }, () => {
            this.randomizeRows();
        });
    }

    startInterval() {
        const intvFn = () => {
            this.step();
        };

        this.intv = window.setInterval(intvFn, STEP_INTV_IN_MS);
    }

    step() {
        this.setState(
            { begin: this.state.begin + 1 },
            this.afterBeginIncrement
        );
    }

    afterBeginIncrement = () => {
        const { begin, length } = this.state;
        const endPos = begin - length;

        if (begin < 0) {
            return;
        }
        if (endPos > this.props.rowsAmount) {
            this.randomizeRows();
            return;
        }

        this.alterRowsColors();
    }

    randomizeRows() {
        const { rowsAmount } = this.props;
        const { rows } = this.state;

        const newBegin = Math.ceil(Math.random() * rowsAmount * 4) * -1;
        const newLength = (COLOR_SMOOTHNESS * 2) + Math.floor(Math.random() * rowsAmount);

        const newRows = rows.map(
            (row: RowProps) => ({
                ...row,
                transformation: getRandomTransformation(),
            })
        );

        this.setState({
            begin: newBegin,
            length: newLength,
            rows: newRows,
        });
    }

    alterRowsColors() {
        const { begin, length } = this.state;
        const { rowsAmount } = this.props;
        const rows = [...this.state.rows] as RowProps[];
        const headPos = begin;
        const tailPos = begin - length;

        const limit = (value: number) => limitForRange(value, 0, rowsAmount);
        const headEnd = limit(headPos);
        const headStart = limit(headPos - COLOR_SMOOTHNESS);
        const tailEnd = limit(tailPos + COLOR_SMOOTHNESS);
        const tailStart = limit(tailPos);

        range(headEnd, headStart).forEach(index => {
            const diff = index - begin + COLOR_SMOOTHNESS;
            rows[index].color = formatColor(diff * 10 + 50);
        });

        range(tailEnd, tailStart).forEach(index => {
            const diff = index - tailPos;
            rows[index].color = formatColor(diff * 10 - 5, 50);
        });

        const randomIndex = this.getRandomRowIndex();
        if (rows[randomIndex]) {
            rows[randomIndex].char = generateRandomChar();
        }

        this.setState({ rows });
    }

    getRandomRowIndex(): number {
        const { begin, length } = this.state;
        const rand = Math.ceil(Math.random() * length);

        return begin - rand;
    }

    renderRows() {
        return this.state.rows.map(
            (row: RowProps) => (
                <Row {...row} key={row.index} />
            )
        );
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
