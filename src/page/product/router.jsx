import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

// 页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/save/index.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/add" component={ProductSave} />
                <Route path="/product/edit/:id" component={ProductSave} />
                {/* 路由params加上?代表可以有可以无，也都可以匹配，会触发组件的update */}
                <Route path="/product/category/index/:id?" component={CategoryList} />
                <Route path="/product/category/add/:id" exact component={CategoryAdd} />
                {/* 利用Redirect和NavLink，可以巧妙地设置好激活路由的样式activeClassName */}
                <Redirect exact from="/product" to="/product/index" />
                <Redirect exact from="/product/category" to="/product/category/index" />
            </Switch>
        )
    }
}
export default ProductRouter;