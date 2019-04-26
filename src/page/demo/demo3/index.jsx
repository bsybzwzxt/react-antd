import React from 'react';
import { connect } from "react-redux";
import { testActions } from 'src/store/actions/test'
import { promiseAll } from 'src/framework/javascript/request'
import { Form, Select, Row, Col, DatePicker, Input, Button, Icon } from "antd";

@connect((state) => ({
        state: state.toJS(),
        test: state.getIn(['test'])
    })
)

class Demo3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{}],
            loading: false
        }
    }

    test = () => {
        // this.setState({'loading': true});
        // console.log(testActions.getAccessList);
        // setInterval(()=>{
        //     console.log(this.props.state.test.accessListLoading);
        // }, 300)
        testActions.getAccessList({ test: 1 }).then((result) => {
            // this.setState({'loading': false});
        }).catch((error) => {
            console.log(this.props.state.test.accessListLoading);
            console.log(this.props.state);
            console.log('error', error);
        });
        // promiseAll([
        //     testActions.getAccessList({}, { loading: false }),
        //     testActions.login({}, { loading: false })
        // ]).then((result) => {
        //     console.log(result);
        // });
        // promiseAll([
        //     {request: testActions.getAccessList, data: {}},
        //     {request: testActions.login, data: {}}
        // ]).then((result)=>{
        //     console.log(result);
        // });
    };

    onChange = (e) => {

    };

    getFields = () => {
        const { getFieldDecorator } = this.props.form;
        return {
            select: getFieldDecorator('select', {
                rules: [
                    { required: true, message: 'Please select your country!' },
                ],
                initialValue: ''
            }),
            date: getFieldDecorator('date', {
                rules: [
                    { required: true, message: 'Please choose your date!' },
                ],
                // initialValue: ''
            }),
            input: getFieldDecorator('input', {
                rules: [
                    { required: true, message: 'Please input your usage!' },
                ],
                initialValue: true
            })
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                testActions.getAccessList().then(() => {

                });
            }
        });
    };

    addRow = () => {

    };

    renderRow = () => {
        const fields = this.getFields();

        return this.state.data.map((item, index) => {
            return (<Row gutter={16} type="flex" align="middle" key={index}>
                <Col span={8}>
                    <Form.Item>
                        {fields.select(
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item>
                        {fields.date(
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        {fields.input(
                            <Input placeholder="Basic usage"/>
                        )}
                    </Form.Item>
                </Col>
                <Col span={1}>
                    <Form.Item>
                        <Icon type="minus-circle"/>
                    </Form.Item>
                </Col>
            </Row>)
        })
    };


    render() {
        // console.log('render', this.props);
        return (
            <div style={{ height: 1000 }}>
                <h1>
                    Demo3
                </h1>
                <br/>
                <button onClick={this.test}>假设这是测试按钮</button>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    {
                        this.renderRow()
                    }
                    <Form.Item
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button type="primary" onClick={this.addRow}>addRow</Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 12, offset: 6 }}
                    >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Demo3);
