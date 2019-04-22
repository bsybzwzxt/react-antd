import React from 'react'
import routes from "./router/routes";
import {renderRoutes} from "react-router-config";
import {HashRouter, Switch, Route, Link} from 'react-router-dom'

export default class App extends React.Component {
    render() {
        return (
            <div className="loading">
                <HashRouter>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </HashRouter>
            </div>
        )
    }

    constructor(props) {
        super(props);
        // console.log('props', props);
        // props.a = 1;
        this.state = {date: new Date()};
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, prevState, snapshot);
    }

    componentWillUnmount() {

    }
}
