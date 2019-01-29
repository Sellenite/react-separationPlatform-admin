import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'component/table-list/index.jsx';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryId: 0,
            firstCategoryList: [],
            secondCategoryList: []
        };
    }

    async componentWillMount() {
        let id = this.props.match.params.id;
        let res = await this.getCategoryList(id);
        this.setState({
            firstCategoryId: id,
            firstCategoryList: res
        });
    }

    // 路由的改变也会触发这个函数
    async componentDidUpdate(prevProps, prevState) {
        let prevId = prevProps.match.params.id || '';
        let id = this.props.match.params.id || '';
        if (prevId !== id) {
            let res = await this.getCategoryList(id);
            this.setState({
                firstCategoryId: id,
                firstCategoryList: res
            });
        }
    }

    getCategoryList(id) {
        let params = {
            categoryId: id ? id : 0
        };
        return client.request('/manage/category/get_category.do', params);
    }

    async changeCategoryName(item) {
        let name = window.prompt('请输入名称：', item.name);
        if (String(name).trim()) {
            let params = {
                categoryId: item.id,
                categoryName: name
            };
            await client.request('/manage/category/set_category_name.do', params);
            let res = await this.getCategoryList(this.state.firstCategoryId);
            this.setState({
                firstCategoryList: res
            });
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to={`/product/category/add/${this.state.firstCategoryId ? this.state.firstCategoryId : 0}`} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.firstCategoryId ?
                            <p>
                                父品类ID: {this.state.firstCategoryId} <Link to="/product/category/index">返回所有列表</Link>
                            </p>
                            : null}
                    </div>
                </div>
                <TableList header={['品类ID', '品类名称', '操作']}>
                    {
                        this.state.firstCategoryList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <a className="opear" onClick={this.changeCategoryName.bind(this, item)}>修改名称</a>
                                        {!this.state.firstCategoryId ? <Link to={`/product/category/index/${item.id}`}>查看子品类</Link> : null}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
            </div>
        );
    }
}

export default CategoryList;