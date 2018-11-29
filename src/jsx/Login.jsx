import React from 'react';
import {Link} from 'react-router-dom'

const e = (
    <div className="login-from">
        <h2><i className="login-logo"></i>欢迎使用 SPEEDRAW</h2>
        <div className="holiday">
            <p>2018国庆节放假PIM系统维护联系人：</p>
            <Link to="/demo2">Demo1</Link>
        </div>
    </div>
);

export default class Login extends React.Component {
    render() {
        return (
            e
        )
    }
}
