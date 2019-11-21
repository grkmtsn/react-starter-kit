import React from 'react';
import ReactDOM from 'react-dom';

import '@/styles/_reboot.scss';
import '@/styles/_main.scss';
import 'filepond/dist/filepond.min.css';

import App from './App';

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
