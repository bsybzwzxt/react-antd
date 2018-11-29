import React from 'react'
import {renderRoutes} from "react-router-config";
import SideBar from "./SideBar";


export default class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <h1>asd</h1>
                <SideBar/>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this);
        // this.state = {date: new Date()};
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, prevState, snapshot);
    }

    componentWillUnmount() {

    }
}
