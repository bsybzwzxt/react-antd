import React from 'react';
import { connect } from "react-redux";
import { testActions } from 'src/store/actions/test'
import { promiseAll } from 'src/framework/javascript/request'
import { Form, Select, Row, Col, DatePicker, Input, Button, Icon } from 'antd';
import moment from 'moment';

const { Option } = Select;
let index = 1;


@connect((state) => ({
        state: state.toJS(),
        test: state.get('test').toJS()
    }), () => ({})
)

class Demo3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            asd: [0]
        };
    }

    test = () => {
        // setInterval(()=>{
        //     console.log(this.props.test.accessListLoading);
        // }, 300)
        console.log(this.props);
        testActions.getAccessList({ test: 1 }).then((result) => {
        }).catch((error) => {
            console.log(this.props.test.accessListLoading);
            console.log(this.props.state);
            console.log('error', error);
        });
        // promiseAll([
        //     testActions.getAccessList({}, { loading: false }),
        //     testActions.login({}, { loading: false })
        // ]).then((result) => {
        //     console.log(result);
        // });
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
            console.log(values);
            if (!err) {
                testActions.getAccessList().then(() => {});
            }
        });
    };

    addRow = () => {
        // let { data } = this.props.form.getFieldsValue();
        // data.push({});
        // console.log(data);
        let a = this.state.asd;
        a.push(index++)
        this.setState({
            asd: a
        });
    };

    removeRow = (i) => {
        // let { data } = this.props.form.getFieldsValue();
        // data.splice(index, 1);
        // console.log(data);
        this.setState({
            asd: this.state.asd.filter(k => k !== i)
        });
    };

    renderRow = () => {
        const { getFieldDecorator } = this.props.form;
        console.log(this.state.asd);
        // let a = [{ select: 'usa', input: 123 }, { select: 'usa', input: 123 }];
        return this.state.asd.map((item, index) => {
            return (<Row gutter={16} type="flex" align="middle" key={index}>
                <Col span={8}>
                    <Form.Item>
                        {getFieldDecorator(`data[${item}][select]`, {
                            rules: [
                                { required: true, message: 'Please input your usage!' },
                            ],
                            initialValue: item.select
                        })(
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item>
                        {getFieldDecorator(`data[${item}][date]`, {
                            rules: [
                                { required: true, message: 'Please input your usage!' },
                            ],
                            initialValue: item.data ? moment(item.data) : undefined
                        })(
                            <DatePicker
                                showTime
                                placeholder="Select Time"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        {getFieldDecorator(`data[${item}][input]`, {
                            rules: [
                                { required: true, message: 'Please input your usage!' },
                            ],
                            initialValue: item.input
                        })(
                            <Input placeholder="Basic usage"/>
                        )}
                    </Form.Item>
                </Col>
                <Col span={1}>
                    <Form.Item>
                        <Icon onClick={() => this.removeRow(item)} type="minus-circle"/>
                    </Form.Item>
                </Col>
            </Row>)
        })
    };

    render() {
        console.log('render', this.props.form.getFieldsValue());
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
