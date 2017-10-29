import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Rain from './components/Rain';
import './index.css';

ReactDOM.render(
    <Rain />,
    document.getElementById('page-wrapper') as HTMLElement
);
