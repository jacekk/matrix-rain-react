import * as React from 'react';

interface RowProps {
    char: string;
}

class Row extends React.Component<RowProps, {}> {
    render() {
        return (
            <div className="row">
                {this.props.char}
            </div>
        );
    }
}

export default Row;
