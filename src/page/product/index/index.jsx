import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
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
            client.errorTip(err);
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
                this.getProductList();
            }
        } catch (err) {
            client.errorTip(err);
        }
    }

    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => this.getProductList());
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
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
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
                                        <Link className="opear" to={`/product/detail/${item.id}`}>详情</Link>
                                        <Link className="opear" to={`/product/save/${item.id}`}>编辑</Link>
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