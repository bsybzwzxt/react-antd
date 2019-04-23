import React from 'react';
import { connect } from "react-redux";
import { testActions } from 'src/store/actions/test'

@connect((state) => ({
        state: state.toJS()
    })
)

export default class Demo3 extends React.Component {

    constructor(props) {
        super(props);
    }

    test = () => {
        testActions.getAccessList({ test: 1 }).then((result) => {
            console.log('result', result);
        }).catch((error) => {
            console.log(this.props.state);
            console.log('error', error);
        })
    };

    render() {
        // console.log('render', this.props);
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
