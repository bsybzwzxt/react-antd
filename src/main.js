import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// import 'antd/dist/antd.css';

import 'src/assets/css/'


import store from './store'
import { setLoading, setCollapsed } from './store/actions/system'

// console.log(store);
// console.log(store.getState());
//
// store.dispatch(setLoading(true))
// console.log(store.getState());
//
// store.dispatch(setCollapsed(true))
// console.log(store.getState());


import App from './App';

ReactDom.render(
    (
        <Provider store={ store }>
            <App/>
        </Provider>
    ),
    document.getElementById('app')
);
