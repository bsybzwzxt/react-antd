import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { testActions } from 'src/store/actions/test'

@connect((state) => ({
        state: state.toJS()
    }), (dispatch) => ({
        actions: bindActionCreators(testActions, dispatch)
    })
)

export default class Demo3 extends React.Component {

    constructor(props) {
        super(props);
    }

    login = () => {
        // system.login({ name: '123', password: '123', a: 'a', b: 'b', c: 'c' }).then((result) => {
        //     console.log('result', result);
        // }).catch((error) => {
        //     console.log('error', error);
        // })
    };

    test = () => {
        this.props.actions.getAccessList({ test: 1 }).then((result) => {
            console.log('result', result);
        }).catch((error) => {
            console.log('error', error);
            console.log(this.props.state.toJS());
        })
        // getAccessList({ test: 1 }).then((result) => {
        //     console.log('result', result);
        // }).catch((error) => {
        //     console.log('error', error);
        //     console.log(this.props.state);
        // })
    };

    render() {
        console.log('render', this.props);
        return (
            <div style={{ height: 1000 }}>
                <h1>
                    Demo3
                </h1>
                <button onClick={this.login}>假设这是登录</button>
                <br/>
                <button onClick={this.test}>假设这是测试按钮</button>
            </div>
        )
    }
}
