import React from 'react';

const dd =
    <div>Demo1</div>
;

export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, prevState, snapshot);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            dd
        )
    }
}
