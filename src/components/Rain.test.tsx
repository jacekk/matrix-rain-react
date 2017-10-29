import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Rain from './Rain';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Rain />, div);
});
