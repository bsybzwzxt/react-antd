import React from 'react'
import {renderRoutes} from "react-router-config";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import './index.css'
import { connect } from "react-redux";

class MainLayout extends React.Component {
    render() {
        return (
            <div className={this.props.system.collapsed ? 'collapsed' : ''}>
                <SideBar/>
                <TopBar/>
                <div className="page transition-all-3">
                    <div className="page-content">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        // console.log(props);
        // console.log(this);
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
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MainLayout);
