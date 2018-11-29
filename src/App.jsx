import React from 'react'
import Demo1 from 'src/jsx/demo/Demo1'
import routes from "./router/routes";
import {renderRoutes} from "react-router-config";
import {HashRouter, Switch, Route, Link} from 'react-router-dom'

// export default () => (
//     <HashRouter>
//         <Switch>
//             {renderRoutes(router)}
//         </Switch>
//     </HashRouter>
// );

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
        console.log('props', props);
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


const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/demo1">Demo1</Link></li>
                <li><Link to="/topics">主题列表</Link></li>
            </ul>
            <Route exact path="/" component={Home}/>
            <Route path="/demo1" component={Demo1}/>
            <Route path="/topics" component={Topics}/>
        </div>
    </Router>
);
const Home = () => (<h2>首页</h2>);
const Topics = ({match}) => (
    <div>
        <h2>主题列表</h2>
        <ul>
            <li><Link to={`${match.url}/rendering`}>使用 React 渲染</Link></li>
            <li><Link to={`${match.url}/components`}>组件</Link></li>
            <li><Link to={`${match.url}/props-v-state`}>属性 v. 状态</Link></li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>请选择一个主题。</h3>
        )}/>
    </div>
);
const Topic = ({match}) => (<h3>{match.params.topicId}</h3>);

