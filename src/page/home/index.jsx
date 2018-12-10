import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCountStatus } from 'store/actions.js';

import PageTitle from 'component/page-title/index.jsx';
import './index.scss';

class Home extends React.Component {
    static propTypes = {
        countStatus: PropTypes.object
    }

    static defaultProps = {
        countStatus: {
            userCount: 0,
            productCount: 0,
            orderCount: 0
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getCountStatus();
    }

    async getCountStatus() {
        try {
            let data = await client.request('/manage/statistic/base_count.do');
            this.props.setCountStatus(data);
        } catch (err) {
            client.errorTip(err);
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.props.countStatus.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{this.props.countStatus.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.props.countStatus.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countStatus: state.countStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCountStatus: (countStatus) => {
            dispatch(setCountStatus(countStatus));
        }
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;