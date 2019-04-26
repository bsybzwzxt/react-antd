import React from 'react'
// import {render} from 'react-dom'
// import {Router, Route, Link} from 'react-router'

import MainLayout from 'src/router/main/';
import Demo1 from 'src/page/demo/demo1/';
import Demo2 from 'src/page/demo/demo2/';
import Demo3 from 'src/page/demo/demo3/';
import DemoForm from 'src/page/demo/demoForm/';
import Login from 'src/page/Login';

const routes = [
    {
        path: '/main',
        component: MainLayout,
        routes: [
            { path: '/main/demo3', component: Demo3 },
            { path: '/main/form', component: DemoForm },
        ]
    },
    { path: '/demo2', component: Demo2 },
    { path: '/', component: Login, exact: true },
];

// React.render(<Router routes={routes}/>, document.body);

export default routes;
