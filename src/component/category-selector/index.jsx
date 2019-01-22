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
    }

    onFirstCategoryChange(e) {
        this.props.onFirstCategoryChange(e.target.value);
    }

    onSecondCategoryChange(e) {
        this.props.onSecondCategoryChange(e.target.value);
    }

    render() {
        return (
            <div className="col-md-10">
                <select className="form-control cate-select" onChange={this.onFirstCategoryChange.bind(this)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.props.firstCategoryList.length > 0 ?
                            this.props.firstCategoryList.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            }) : null
                    }
                </select>
                <select name="" className="form-control cate-select" onChange={this.onSecondCategoryChange.bind(this)}>
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