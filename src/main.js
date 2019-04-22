import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import 'src/assets/css/'

import store from './store'

import App from './App';

ReactDom.render(
    (
        <Provider store={ store }>
            <App/>
        </Provider>
    ),
    document.getElementById('app')
);
