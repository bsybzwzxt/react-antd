import React from 'react';
import Parallax from 'parallax-js'
import {Form, Icon, Input, Button, Checkbox} from 'antd';

class Login extends React.Component {
    render() {
        // const {getFieldDecorator} = this.props.form;

        return (
            <div className="login">
                <div className="login-left">
                    <div id="illus" className="illus">
                        <div className="ele_wrapper layer_1" data-depth="0.7">
                            <div className="cyl"></div>
                        </div>
                        <div className="ele_wrapper layer_2" data-depth="0.6">
                            <div className="wave"></div>
                            <div className="cube"></div>
                        </div>
                        <div className="ele_wrapper layer_3" data-depth="0.55">
                            <div className="front"></div>
                        </div>
                        <div className="ele_wrapper layer_4" data-depth="0.5">
                            <div className="human"></div>
                        </div>
                        <div className="ele_wrapper layer_5" data-depth="0.45">
                            <div className="dots"></div>
                        </div>
                        <div className="ele_wrapper layer_6" data-depth="0.4">
                            <div className="mid"></div>
                        </div>
                        <div className="ele_wrapper layer_7" data-depth="0.3">
                            <div className="black"></div>
                        </div>
                        <div className="ele_wrapper layer_8" data-depth="0.2">
                            <div className="back"></div>
                        </div>
                    </div>
                </div>
                <div className="login-right">
                    <Form onSubmit={() => this.handleSubmit()} className="login-form">
                        <h2>React + Antd</h2>
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <br/>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                            <p></p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        let illus = document.getElementById('illus');
        new Parallax(illus, {
            relativeInput: false,
            clipRelativeInput: true,
            calibrateX: true,
            calibrateY: true,
            invertX: true,
            invertY: true,
            limitX: 500,
            limitY: 300,
            scalarX: 8,
            scalarY: 8,
            frictionX: 0.2,
            frictionY: 0.8
        });
    }

    handleSubmit() {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

}

// Login = Form.create()(Login);

export default Login