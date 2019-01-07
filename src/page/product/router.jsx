import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

// 页面
import ProductList from 'page/product/index/index.jsx';
import CategoryList from 'page/product/category/index.jsx';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/category" exact component={CategoryList} />
                <Redirect exact from="/product" to="/product/index" />
            </Switch>
        )
    }
}
export default ProductRouter;