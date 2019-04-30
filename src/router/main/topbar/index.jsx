import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'antd';
import { systemActions } from 'src/store/actions/system'
import './index.css'

@connect((state) => ({
        collapsed: state.getIn(['system', 'collapsed'])
    }), () => ({})
)

export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const a = {};
        const { collapsed } = this.props;

        return (
            <div className="topbar transition-all-3">
                <Button type="primary" onClick={() => systemActions.setCollapsed(!collapsed)}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
            </div>
        );
    }

}

// export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
