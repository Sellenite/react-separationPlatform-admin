import React from 'react';
import PropTypes from 'prop-types';

class TableList extends React.Component {
    static propTypes = {
        header: PropTypes.array.isRequired,
        children: PropTypes.array.isRequired
    }

    // 定义默认props
    static defaultProps = {
        header: [],
        children: []
    }

    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true
        }
    }

    // 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
    componentWillReceiveProps() {
        this.setState({
            isFirstLoad: false
        })
    }

    render() {

        let header = this.props.header.map((item, index) => {
            if (typeof item === 'object') {
                return <td key={index} width={item.width}>{item.name}</td>
            } else {
                return <td key={index}>{item}</td>
            }
        })

        let noData = (
            <tr>
                <td colSpan={header.length}>{this.state.isFirstLoad ? '正在加载数据...' : '没有找到相应的结果'}</td>
            </tr>
        );

        let body = this.props.children.length === 0 ? noData : this.props.children;

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>{header}</tr>
                        </thead>
                        <tbody>
                            {body}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;