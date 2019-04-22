import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Icon, Button } from 'antd';
import { systemActions } from 'src/store/actions/system'
import './index.css'

@connect((state) => ({
        collapsed: state.getIn(['system', 'collapsed'])
    }), (dispatch) => ({
        actions: bindActionCreators(systemActions, dispatch)
    })
)

export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { collapsed } = this.props;

        return (
            <div className="topbar transition-all-3">
                <Button type="primary" onClick={() => this.props.actions.setCollapsed(!collapsed)}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
            </div>
        );
    }

}

// export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
