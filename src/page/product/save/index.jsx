import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'component/category-selector/index.jsx';
import FileUploader from 'component/file-uploader/index.jsx';
import RichEditor from 'component/rich-editor/index.jsx';

import './index.scss';

class ProductAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            productDetail: null,
            propsDetail: {
                firstCategoryId: '',
                secondCategoryId: '',
                detail: ''
            },
            firstCategoryList: [],
            secondCategoryList: [],
            firstCategoryId: '',
            secondCategoryId: '',
            uploadImageList: [],
            name: '',
            subtitle: '',
            detail: '',
            price: '',
            stock: '',
            status: 1
        }
    }

    async componentWillMount() {
        try {
            let p1, productDetail, firstCategoryList;
            let secondCategoryList = [];
            // 父分类是无论新增或者修改都要先拿到
            p1 = this.getCategoryList();
            if (this.state.productId) {
                // 与拿父分类接口并行，必须先拿到商品详情的父分类id，才能获取子分类接口
                productDetail = await this.getProductDetail();
                secondCategoryList = await this.getCategoryList(productDetail.parentCategoryId);
            }
            firstCategoryList = await p1;
            this.setState({
                firstCategoryList,
                secondCategoryList,
                productDetail: productDetail || null
            }, () => {
                if (this.state.productDetail) {
                    console.log(this.state.productDetail);
                    this.setProductDetail();
                }
            });
        } catch (err) {
            client.errorTip(err);
        }
    }

    getProductDetail() {
        let params = {
            productId: this.state.productId
        };
        return client.request('/manage/product/detail.do', params);
    }

    setProductDetail() {
        this.setState({
            firstCategoryId: this.state.productDetail.parentCategoryId,
            secondCategoryId: this.state.productDetail.categoryId,
            uploadImageList: this.formatUploadImageList(),
            name: this.state.productDetail.name,
            subtitle: this.state.productDetail.subtitle,
            detail: this.state.productDetail.detail,
            price: this.state.productDetail.price,
            stock: this.state.productDetail.stock,
            status: this.state.productDetail.status,
            propsDetail: {
                firstCategoryId: this.state.productDetail.parentCategoryId,
                secondCategoryId: this.state.productDetail.categoryId,
                detail: this.state.productDetail.detail
            }
        });
    }

    formatUploadImageList() {
        let result,
            arr = this.state.productDetail.subImages.split(',').map((item) => {
                if (item) {
                    return {
                        uri: item,
                        url: this.state.productDetail.imageHost + item
                    };
                } else {
                    return '';
                }
            });
        // 有些图片返回格式有问题
        result = arr.slice();
        for (let item of arr) {
            if (!item) {
                result = [];
                break;
            }
        }
        return result;
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
                secondCategoryList: [],
                firstCategoryId: ''
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
        uploadImageList.push(res);
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

    handleValueChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    handleEditorChange(html) {
        this.setState({
            detail: html
        });
    }

    async submitSaveProduct() {
        let pause = false;
        let params = {
            categoryId: this.state.secondCategoryId,
            name: this.state.name,
            subtitle: this.state.subtitle,
            detail: this.state.detail,
            price: this.state.price,
            stock: this.state.stock,
            status: this.state.status,
            subImages: this.state.uploadImageList.map(item => item.uri).join(',')
        }
        if (this.state.productId) {
            params.id = this.state.productId;
        }
        for (let key in params) {
            if (!params[key]) {
                pause = true;
                break
            }
        }
        if (pause) {
            client.errorTip('请填写完整的信息');
            return;
        }
        try {
            await client.request('/manage/product/save.do', params);
            if (params.id) {
                client.successTip('修改商品成功！');
            } else {
                client.successTip('添加商品成功！');
            }
            this.props.history.replace('/product/index');
        } catch (err) {
            client.errorTip(err);
        }
    }

    render() {
        return (
            <div id="page-wrapper" className="page-add">
                <PageTitle title={this.state.productId ? '编辑商品' : '添加商品'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品名称"
                                value={this.state.name}
                                name="name" onChange={this.handleValueChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                placeholder="请输入商品描述"
                                value={this.state.subtitle}
                                name="subtitle" onChange={this.handleValueChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector firstCategoryList={this.state.firstCategoryList} secondCategoryList={this.state.secondCategoryList} onFirstCategoryChange={this.handleFirstCategoryChange.bind(this)} onSecondCategoryChange={this.handleSecondCategoryChange.bind(this)} firstCategoryId={this.state.propsDetail.firstCategoryId} secondCategoryId={this.state.propsDetail.secondCategoryId} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder="价格"
                                    value={this.state.price}
                                    name="price" onChange={this.handleValueChange.bind(this)} />
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
                                    value={this.state.stock}
                                    name="stock" onChange={this.handleValueChange.bind(this)} />
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
                                                        <img src={item.url} className="img" />
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
                            <RichEditor onEditorChange={this.handleEditorChange.bind(this)} html={this.state.propsDetail.detail}></RichEditor>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" onClick={this.submitSaveProduct.bind(this)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductAdd;