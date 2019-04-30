import React from 'react'
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import './index.css'
import { Spin } from "antd";

@connect((state) => ({
        collapsed: state.getIn(['system', 'collapsed']),
        loading: state.getIn(['system', 'loading'])
    }), () => ({})
)

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps, prevState, snapshot);
    }

    componentWillUnmount() {}

    render() {
        const { collapsed, loading } = this.props;

        return (
            <Spin spinning={loading} tip="Loading...">
                <div className={collapsed ? 'collapsed' : ''}>
                    <SideBar/>
                    <TopBar/>
                    <div className="page transition-all-3">
                        <div className="page-content">
                            {renderRoutes(this.props.route.routes)}
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
}
