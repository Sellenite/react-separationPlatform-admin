import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'component/category-selector/index.jsx';
import FileUploader from 'component/file-uploader/index.jsx';

import './index.scss';

class ProductAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            secondCategoryList: [],
            firstCategoryId: '',
            secondCategoryId: '',
            uploadImageList: []
        }
    }

    async componentWillMount() {
        try {
            let res = await this.getCategoryList();
            this.setState({
                firstCategoryList: res
            });
        } catch (err) {
            client.errorTip(err);
        }
    }

    getCategoryList(id) {
        let params = {
            categoryId: id ? id : 0
        };
        return client.request('/manage/category/get_category.do', params);
    }

    async handleFirstCategoryChange(id) {
        if (!id) {
            this.setState({
                secondCategoryList: []
            });
            return;
        }
        try {
            let res = await this.getCategoryList(id);
            this.setState({
                secondCategoryList: res,
                firstCategoryId: id
            });
        } catch (err) {
            client.errorTip(err);
        }
    }

    handleSecondCategoryChange(id) {
        this.setState({
            secondCategoryId: id
        });
    }

    uploadFileSuccess(res) {
        let uploadImageList = this.state.uploadImageList;
        uploadImageList.push(res.url);
        this.setState({
            uploadImageList
        });
    }

    uploadFileError(err) {
        client.errorTip(err);
    }

    deleteImg(index, e) {
        let uploadImageList = this.state.uploadImageList;
        uploadImageList.splice(index, 1);
        this.setState({
            uploadImageList
        });
    }

    render() {
        return (
            <div id="page-wrapper" className="page-add">
                <PageTitle title='添加商品' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品名称"
                                name="name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品描述"
                                name="subtitle" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector firstCategoryList={this.state.firstCategoryList} secondCategoryList={this.state.secondCategoryList} onFirstCategoryChange={this.handleFirstCategoryChange.bind(this)} onSecondCategoryChange={this.handleSecondCategoryChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="价格"
                                    name="price" />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="库存"
                                    name="stock" />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10 uploadArea">
                            {
                                this.state.uploadImageList.length === 0 ?
                                    <span>请上传图片</span> :
                                    <div className="clearFix">
                                        {
                                            this.state.uploadImageList.map((item, index) => {
                                                return (
                                                    <div className="img-con" key={index}>
                                                        <img src={item} className="img" />
                                                        <i className="fa fa-close" onClick={this.deleteImg.bind(this, index)}></i>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                            }
                            <FileUploader url="/manage/product/upload.do" onSuccess={this.uploadFileSuccess.bind(this)} onError={this.uploadFileError.bind(this)}>
                                <button className="btn btn-xs btn-primary" style={{ marginTop: '7px' }}>点击上传图片</button>
                            </FileUploader>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductAdd;