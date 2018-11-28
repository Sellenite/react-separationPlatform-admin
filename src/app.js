import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx';

// 页面
import Home from 'page/home/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Login from 'page/login/index.jsx';

class App extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        );

        return (
            <Router>
                <Switch>
                    <Route path="/Login" component={Login} />
                    <Route path="/" render={props => LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);