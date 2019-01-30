import React from 'react';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        searchType: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            searchType: props.searchType[0].value,
            searchKeyword: ''
        }
    }

    onSearchTypeChange(e) {
        this.setState({
            searchType: e.target.value
        })
    }

    onSearchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    onSubmit() {
        this.props.onSubmit(this.state.searchType, this.state.searchKeyword);
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" onChange={this.onSearchTypeChange.bind(this)}>
                                {
                                    this.props.searchType.map((item, index) => {
                                        return <option value={item.value} key={index}>{item.key}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="关键词"
                                onChange={this.onSearchKeywordChange.bind(this)}
                                onKeyUp={this.onKeyUp.bind(this)} />
                        </div>
                        <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchBox;