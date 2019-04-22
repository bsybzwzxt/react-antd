import React from 'react';
import {Link} from 'react-router-dom'

const e = (
    <div className="login-from">
        <h2><i className="login-logo"></i>欢迎使用 SPEEDRAW</h2>
        <div className="holiday">
            <p>这是一个p标签</p>
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
