import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import Client from 'util/client.js';

const client = new Client();

import { connect } from 'react-redux';
import { saveRegisterInfo } from 'store/actions.js';

class Login extends React.Component {
    static propTypes = {
        saveRegisterInfo: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillMount() {
        document.title = '欢迎登录 - MMALL管理系统';
    }

    onInputChange(e) {
        // 利用元素的name属性，一个函数区分全部输入
        let target = e.target.name;
        this.setState({
            [target]: e.target.value
        });
    }

    async onSubmit() {
        let params = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await client.request('/manage/user/login.do', params);
            this.props.saveRegisterInfo(res);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange={this.onInputChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={this.onInputChange.bind(this)} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit.bind(this)}>登录</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveRegisterInfo: (info) => {
            dispatch(saveRegisterInfo(info));
        }
    }
}

Login = connect(null, mapDispatchToProps)(Login);

export default Login;