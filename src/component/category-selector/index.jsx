import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class CategorySelector extends React.Component {
    static propTypes = {
        firstCategoryList: PropTypes.array.isRequired,
        secondCategoryList: PropTypes.array.isRequired,
        onFirstCategoryChange: PropTypes.func.isRequired,
        firstCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        secondCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    constructor(props) {
        super(props);
        this.state = {
            firstCategoryId: '',
            secondCategoryId: ''
        }
    }

    // 传入的props，func和数组都会再执行这个钩子，防止复写数据
    componentWillReceiveProps(nextProps) {
        // 可以使用这种方法判断是否重新复写
        const isFirstCategoryIdChange = this.props.firstCategoryId !== nextProps.firstCategoryId;
        const isSecondCategoryIdChange = this.props.secondCategoryId !== nextProps.secondCategoryId;
        if (!isFirstCategoryIdChange && isSecondCategoryIdChange) {
            return
        }
        if (isFirstCategoryIdChange) {
            this.setState({
                firstCategoryId: nextProps.firstCategoryId
            });
        }
        if (isSecondCategoryIdChange) {
            this.setState({
                secondCategoryId: nextProps.secondCategoryId
            });
        }
    }

    onFirstCategoryChange(e) {
        this.setState({
            firstCategoryId: e.target.value
        });
        this.props.onFirstCategoryChange(e.target.value);
    }

    onSecondCategoryChange(e) {
        this.setState({
            secondCategoryId: e.target.value
        });
        this.props.onSecondCategoryChange(e.target.value);
    }

    render() {
        return (
            <div className="col-md-10">
                <select className="form-control cate-select" onChange={this.onFirstCategoryChange.bind(this)} value={this.state.firstCategoryId}>
                    <option value="">请选择一级分类</option>
                    {
                        this.props.firstCategoryList.length > 0 ?
                            this.props.firstCategoryList.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            }) : null
                    }
                </select>
                <select name="" className="form-control cate-select" onChange={this.onSecondCategoryChange.bind(this)} value={this.state.secondCategoryId}>
                    <option value="">请选择二级分类</option>
                    {
                        this.props.secondCategoryList.length > 0 ?
                            this.props.secondCategoryList.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            }) : null
                    }
                </select>
            </div>
        )
    }
}

export default CategorySelector;