import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryId: 0,
            firstCategoryList: [],
            categoryName: ''
        };
    }

    async componentWillMount() {
        let id = this.props.match.params.id;
        let res = await this.getCategoryList();
        this.setState({
            firstCategoryId: id,
            firstCategoryList: res
        });
    }

    getCategoryList(id) {
        let params = {
            categoryId: id ? id : 0
        };
        return client.request('/manage/category/get_category.do', params);
    }

    handleValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit() {
        if (!String(this.state.categoryName).trim()) {
            client.errorTip('请填写品类名称');
            return;
        }
        let params = {
            parentId: this.state.firstCategoryId,
            categoryName: this.state.categoryName
        };
        await client.request('/manage/category/add_category.do', params);
        if (this.state.firstCategoryId != 0) {
            this.props.history.replace(`/product/category/index/${this.state.firstCategoryId}`);
        } else {
            this.props.history.replace(`/product/category/index`);
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <div to="/product/category/index" className="btn btn-primary" onClick={this.goBack.bind(this)}>
                            <span>返回</span>
                        </div>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="firstCategoryId"
                                        className="form-control"
                                        value={this.state.firstCategoryId}
                                        onChange={this.handleValueChange.bind(this)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.firstCategoryList.map((item, index) => {
                                                return <option value={item.id} key={index}>根品类/{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                        placeholder="请输入品类名称"
                                        name="categoryName"
                                        onChange={this.handleValueChange.bind(this)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;