import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'component/table-list/index.jsx';

import './index.scss';

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: props.match.params.id,
            orderDetail: {
                // 设置默认值防止对象访问/数组遍历时为undefined
                shippingVo: {},
                orderItemVoList: []
            }
        }
    }

    async componentWillMount() {
        try {
            await this.getOrderDetail();
        } catch (err) {
            client.errorTip(err);
        }
    }

    async getOrderDetail() {
        let res = await client.request('/manage/order/detail.do', { orderNo: this.state.orderNo });
        this.setState({
            orderDetail: res
        });
    }

    async changeOrderStatus() {
        if (window.confirm('是否确认该订单已经发货？')) {
            try {
                await client.request('/manage/order/send_goods.do', { orderNo: this.state.orderNo });
                await this.getOrderDetail();
            } catch (err) {
                client.errorTip(err);
            }
        }
    }

    render() {
        let header = [
            { name: '商品图片', width: '10%' },
            { name: '商品信息', width: '45%' },
            { name: '单价', width: '15%' },
            { name: '数量', width: '15%' },
            { name: '合计', width: '15%' }
        ];
        // 后台返回的shippingVo这个字段有可能为null..
        let shippingVo = this.state.orderDetail.shippingVo || {};
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderDetail.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderDetail.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {
                                    !shippingVo.receiverName ? '收件人为空' :
                                        <span>
                                            {shippingVo.receiverName || ''}，
                                            {shippingVo.receiverProvince}
                                            {shippingVo.receiverCity}
                                            {shippingVo.receiverAddress}
                                            {shippingVo.receiverMobile || shippingVo.receiverPhone}
                                        </span>
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderDetail.statusDesc}
                                {
                                    this.state.orderDetail.status === 20
                                        ? <button className="btn btn-default btn-sm btn-send-goods" onClick={this.changeOrderStatus.bind(this)}>立即发货</button>
                                        : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderDetail.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderDetail.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList header={header}>
                                {
                                    this.state.orderDetail.orderItemVoList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        !item.productImage ?
                                                            <span>图片缺失</span> :
                                                            <img className="p-img" alt={item.productName}
                                                                src={`${this.state.orderDetail.imageHost}${item.productImage}`} />
                                                    }
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>￥{item.currentUnitPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>￥{item.totalPrice}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderDetail;