import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import SearchBox from 'component/search-box/index.jsx';
import TableList from 'component/table-list/index.jsx';
import Pagination from 'component/pagination/index.jsx';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            pageNum: 1,
            pageSize: 10,
            orderList: [],
            searchType: '',
            searchKeyword: ''
        };
    }

    componentWillMount() {
        this.getOrderList();
    }

    async getOrderList() {
        let params = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        try {
            let res = await client.request('/manage/order/list.do', params);
            this.setState({
                orderList: res.list,
                total: res.total,
                pageNum: res.pageNum
            });
        } catch (err) {
            this.setState({
                total: 0,
                orderList: []
            });
            client.errorTip(err);
        }
    }

    async getOrderSearchList() {
        if (Number.isNaN(+this.state.searchKeyword)) {
            client.errorTip('请输入格式正确的订单号');
            return;
        }
        let params = {
            [this.state.searchType]: this.state.searchKeyword,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        try {
            let res = await client.request('/manage/order/search.do', params);
            this.setState({
                orderList: res.list,
                total: res.total,
                pageNum: res.pageNum
            });
        } catch (err) {
            this.setState({
                total: 0,
                orderList: []
            });
        }
    }

    onPageNumChange(pageNum) {
        this.setState({
            pageNum
        }, () => !this.state.searchKeyword ? this.getOrderList() : this.getOrderSearchList());
    }

    handleSearchSubmit(searchType, searchKeyword) {
        searchKeyword = String(searchKeyword).trim();
        this.setState({
            pageNum: 1,
            searchType,
            searchKeyword
        }, () => !this.state.searchKeyword ? this.getOrderList() : this.getOrderSearchList());
    }

    render() {
        let header = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表" />
                <SearchBox onSubmit={this.handleSearchSubmit.bind(this)} searchType={[{ key: '按订单号查询', value: 'orderNo' }]}></SearchBox>
                <TableList header={header}>
                    {
                        this.state.orderList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/order/detail/${item.orderNo}`}>{item.orderNo}</Link>
                                    </td>
                                    <td>{item.receiverName}</td>
                                    <td>{item.statusDesc}</td>
                                    <td>￥{item.payment}</td>
                                    <td>{item.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${item.orderNo}`}>详情</Link>
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

export default OrderList;