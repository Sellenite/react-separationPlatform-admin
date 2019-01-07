import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers.js';

import Layout from 'component/layout/index.jsx';

const store = createStore(reducer);

import Client from 'util/client.js';

window.client = new Client();

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
import UserList from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Login from 'page/login/index.jsx';
import ProductRouter from 'page/product/router.jsx';

class App extends React.Component {
    render() {
        let LayoutRouter = (props) => {
            return (
                // 为了传入router的history进行nav-top的跳转到login
                // ...props是快捷传入父组件的传入的属性到子组件里
                <Layout {...props}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/user" component={UserList} />
                        <Route path="/product" component={ProductRouter} />
                        <Route path="/product/category" component={ProductRouter} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Layout>
            );
        }

        return (
            <Router>
                <Switch>
                    <Route path="/Login" component={Login} />
                    <Route path="/" render={LayoutRouter} />
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