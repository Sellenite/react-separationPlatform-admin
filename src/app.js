import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers.js';

import Layout from 'component/layout/index.jsx';

const store = createStore(reducer);

// 监听状态
let currentValue = store.getState();
const listener = () => {
    const previousValue = currentValue;
    currentValue = store.getState();
    console.log('当前state:');
    console.log(currentValue);
}

// 订阅监听状态
store.subscribe(listener);

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

class AppStore extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}


ReactDOM.render(
    <AppStore />,
    document.getElementById('app')
);