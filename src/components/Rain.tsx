import * as React from 'react';

import {
    COL_SIZE,
    COLOR_SMOOTHNESS,
    ROW_SIZE,
    STEP_INTV_IN_MS,
} from '../constants';
import {
    formatColor,
    generateRandomChar,
    getRandomBegin,
    getRandomLength,
    getRandomTransformation,
    getRangeRandom,
    limitForRange,
    range,
} from '../utils';

import Column, { ColumnModel } from './Column';
import { RowProps } from './Row';

interface RainState {
    colsAmount: number;
    rowsAmount: number;
    columns: ColumnModel[];
}

class Rain extends React.Component<{}, RainState> {
    state = {
        colsAmount: 0,
        rowsAmount: 0,
        columns: [],
    };

    private intv?: number;

    componentDidMount() {
        this.initState();
        this.startInterval();
    }

    startInterval() {
        this.intv = window.setInterval(
            () => { this.step(); },
            STEP_INTV_IN_MS
        );
    }

    initState() {
        const { colsAmount, rowsAmount } = this.calculateAmounts();
        const columns = this.generateColumns(colsAmount, rowsAmount);

        this.setState({ colsAmount, rowsAmount, columns });
    }

    generateColumns(
        colsAmount: number,
        rowsAmount: number,
    ): ColumnModel[] {
        return range(colsAmount).map(
            () => ({
                begin: getRandomBegin(rowsAmount),
                length: getRandomLength(rowsAmount),
                rows: this.generateRows(rowsAmount),
            } as ColumnModel)
        );
    }

    generateRows(rowsAmount: number): RowProps[] {
        return range(rowsAmount).map(
            (index: number) => ({
                index,
                color: '',
                char: generateRandomChar(),
                transformation: getRandomTransformation(),
            } as RowProps)
        );
    }

    calculateAmounts() {
        let rowsAmount = Math.floor(window.innerHeight / ROW_SIZE);
        let colsAmount = Math.floor(window.innerWidth / COL_SIZE);

        return { colsAmount, rowsAmount };
    }

    step() {
        const { rowsAmount, columns } = this.state;

        const mappedColumns: ColumnModel[] = columns.map(
            (column: ColumnModel) => {
                const begin = column.begin + 1;
                const endPos = column.begin - column.length;

                if (begin < 0) {
                    return { ...column, begin };
                }
                if (endPos > rowsAmount) {
                    return this.randomizeColumn(column);
                }

                return {
                    ...column,
                    begin,
                    rows: this.alterColumnRows(column, begin)
                };
            }
        );

        this.setState({ columns: mappedColumns });
    }

    alterColumnRows(
        column: ColumnModel,
        newBegin: number // not set yet in state
    ): RowProps[] {
        const { rowsAmount } = this.state;
        const { length } = column;
        const rows = [...column.rows] as RowProps[];

        // below could be a pure func
        const headPos = newBegin;
        const tailPos = newBegin - length;
        const limit = (value: number) => limitForRange(value, 0, rowsAmount);

        const headEnd = limit(headPos);
        const headStart = limit(headPos - COLOR_SMOOTHNESS);
        const tailEnd = limit(tailPos + COLOR_SMOOTHNESS);
        const tailStart = limit(tailPos);

        range(headEnd, headStart).forEach(index => {
            const diff = index - newBegin + COLOR_SMOOTHNESS;
            rows[index].color = formatColor(diff * 10 + 50);
        });

        range(tailEnd, tailStart).forEach(index => {
            const diff = index - tailPos;
            rows[index].color = formatColor(diff * 10 - 5, 50);
        });

        const randomIndex = getRangeRandom(newBegin, length);
        if (rows[randomIndex]) {
            rows[randomIndex].char = generateRandomChar();
        }

        return rows;
    }

    randomizeColumn(column: ColumnModel) {
        const { rowsAmount } = this.state;
        const rows = column.rows.map(
            (row: RowProps) => ({
                ...row,
                transformation: getRandomTransformation(),
            })
        );

        return {
            ...column,
            begin: getRandomBegin(rowsAmount),
            length: getRandomLength(rowsAmount),
            rows,
        };
    }

    renderColumns() {
        return this.state.columns.map(
            (item: ColumnModel, index: number) => (
                <Column
                    key={index}
                    index={index}
                    rows={item.rows}
                />
            )
        );
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
