import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'antd';

import './index.css'
import { setLoading, setCollapsed } from 'src/store/actions/system'

class TopBar extends React.Component {
    render() {
        return (
            <div className="topbar transition-all-3">
                <Button type="primary" onClick={() => this.props.toggleCollapsed(this.props.system.collapsed)}>
                    <Icon type={this.props.system.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </Button>
            </div>
        );
    }

    constructor(props) {
        super(props);
        console.log(props);
        // console.log('props', props);
    }

}

const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => {
    return {
        toggleCollapsed: collapsed => {
            dispatch(setCollapsed(!collapsed));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
