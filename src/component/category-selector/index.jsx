import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class CategorySelector extends React.Component {
    static propTypes = {
        firstCategoryList: PropTypes.array.isRequired,
        secondCategoryList: PropTypes.array.isRequired,
        onFirstCategoryChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            firstCategoryId: '',
            secondCategoryId: '',
            firstPropsSet: false,
            secondPropsSet: false
        }
    }

    // 数据回填时如果填过一次，就不用每次都set对应的id，不然会修改不了数据
    componentWillReceiveProps(nextProps) {
        if (nextProps.firstCategoryId && !this.state.firstPropsSet) {
            this.setState({
                firstCategoryId: nextProps.firstCategoryId,
                firstPropsSet: true
            });
        }
        if (nextProps.secondCategoryId && !this.state.secondPropsSet) {
            this.setState({
                secondCategoryId: nextProps.secondCategoryId,
                secondPropsSet: true
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