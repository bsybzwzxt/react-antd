import React from 'react'
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import SideBar from "./sidebar";
import TopBar from "./topbar";

import './index.css'

class MainLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps, prevState, snapshot);
    }

    componentWillUnmount() {

    }

    render() {
        // console.log(this.props);
        const { collapsed } = this.props;

        return (
            <div className={collapsed ? 'collapsed' : ''}>
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
}

const mapStateToProps = (state) => ({
    system: state.get('system'),
    collapsed: state.getIn(['system', 'collapsed'])
});


export default connect(mapStateToProps)(MainLayout);
