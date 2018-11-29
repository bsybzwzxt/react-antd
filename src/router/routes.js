import React from 'react'
// import {render} from 'react-dom'
// import {Router, Route, Link} from 'react-router'

import MainLayout from 'src/router/main';
import Demo1 from 'src/jsx/demo/Demo1';
import Demo2 from 'src/jsx/demo/Demo2';
import Demo3 from 'src/jsx/demo/Demo3';
import Login from 'src/jsx/Login';

// console.log(MainLayout);

const routes = [
    {
        // path: '/main',
        component: MainLayout,
        routes: [
            {path: '/main/demo3', component: Demo3},
        ]
    },
    {path: '/demo2', component: Demo2},
    {path: '/', component: Login, exact: true},
];

// React.render(<Router routes={routes}/>, document.body);

export default routes;