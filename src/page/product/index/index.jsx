import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import SearchBox from 'component/search-box/index.jsx';
import TableList from 'component/table-list/index.jsx';
import Pagination from 'component/pagination/index.jsx';

import './index.scss';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            pageNum: 1,
            pageSize: 10,
            searchType: '',
            searchKeyword: '',
            productList: []
        };
    }

    componentWillMount() {
        this.getProductList();
    }

    async getProductList() {
        let params = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        try {
            let res = await client.request('/manage/product/list.do', params);
            this.setState({
                productList: res.list,
                total: res.total,
                pageNum: res.pageNum
            });
        } catch (err) {
            this.setState({
                total: 0,
                productList: []
            });
            client.errorTip(err);
        }
    }

    async getProductSearchList() {
        if (this.state.searchType === 'productId' && Number.isNaN(+this.state.searchKeyword)) {
            client.errorTip('请输入格式正确的商品ID');
            return;
        }
        let params = {
            [this.state.searchType]: this.state.searchKeyword,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        try {
            let res = await client.request('/manage/product/search.do', params);
            this.setState({
                productList: res.list,
                total: res.total,
                pageNum: res.pageNum
            });
        } catch (err) {
            this.setState({
                total: 0,
                productList: []
            });
        }
    }

    async changeProductStatus(item, event) {
        let params = {
            productId: item.id,
            status: item.status === 1 ? 2 : 1
        };
        let comfirmString = item.status === 1 ? `确认下架${item.name}?` : `确认上架${item.name}?`;
        try {
            if (window.confirm(comfirmString)) {
                await client.request('/manage/product/set_sale_status.do', params)
                this.state.searchKeyword ? this.getProductSearchList() : this.getProductList()
            }
        } catch (err) {
            client.errorTip(err);
        }
    }

    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => !this.state.searchKeyword ? this.getProductSearchList() : this.getProductList());
    }

    handleSearchSubmit(searchType, searchKeyword) {
        searchKeyword = String(searchKeyword).trim();
        this.setState({
            pageNum: 1,
            searchType,
            searchKeyword
        }, () => !this.state.searchKeyword ? this.getProductList() : this.getProductSearchList());
    }

    render() {
        let header = [
            { name: '商品ID', width: '10%' },
            { name: '商品信息', width: '60%' },
            { name: '价格', width: '10%' },
            { name: '状态', width: '10%' },
            { name: '操作', width: '10%' },
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <SearchBox onSubmit={this.handleSearchSubmit.bind(this)} searchType={[{ key: '按商品ID查询', value: 'productId' }, { key: '按商品名称查询', value: 'productName' }]}></SearchBox>
                <TableList header={header}>
                    {
                        this.state.productList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <p>{item.name}</p>
                                        <p>{item.subtitle}</p>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <p>{item.status === 1 ? '在售' : '已下架'}</p>
                                        <button className="btn btn-xs btn-warning" onClick={this.changeProductStatus.bind(this, item)}>{item.status == 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/edit/${item.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
            </div>
        );
    }
}

export default ProductList;