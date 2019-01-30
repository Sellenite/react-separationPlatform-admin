import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

// 页面
import OrderList from 'page/order/index/index.jsx';
import OrderDetail from 'page/order/detail/index.jsx';

class OrderRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/order/index" component={OrderList} />
                <Route path="/order/detail/:id" component={OrderDetail} />
                <Redirect exact from='/order' to='/order/index' />
            </Switch>
        )
    }
}
export default OrderRouter;