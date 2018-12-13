import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            isFirstLoad: true,
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
        } finally {
            this.setState({
                isFirstLoad: false
            });
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>用户名</td>
                                    <td>邮箱</td>
                                    <td>电话</td>
                                    <td>注册时间</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.userList.length === 0
                                        ?
                                        <tr>
                                            <td colSpan="5">{this.state.isFirstLoad ? '正在加载数据...' : '没有找到相应的结果'}</td>
                                        </tr>
                                        :
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
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.onChangePageNum.bind(this)} />
            </div>
        );
    }
}

export default UserList;