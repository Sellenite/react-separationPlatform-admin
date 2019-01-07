import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'component/table-list/index.jsx';
import Pagination from 'component/pagination/index.jsx';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            userList: []
        };
    }

    componentWillMount() {
        this.getUserList();
    }

    onChangePageNum(pageNum) {
        // setState是一个异步操作，回调的写法如下
        this.setState({
            pageNum
        }, () => {
            this.getUserList();
        });
    }

    async getUserList() {
        let params = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum
        };
        try {
            let res = await client.request('/manage/user/list.do', params);
            this.setState({
                pageNum: res.pageNum,
                total: res.total,
                userList: res.list
            });
        } catch (err) {
            client.errorTip(err);
        }
    }

    render() {
        let theadArr = ['ID', '用户名', '邮箱', '电话', '注册时间'];
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList header={theadArr}>
                    {
                        this.state.userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{new Date(item.createTime).toLocaleString()}</td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.onChangePageNum.bind(this)} />
            </div>
        );
    }
}

export default UserList;