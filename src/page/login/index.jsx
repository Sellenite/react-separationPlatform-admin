import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: '',
            activeClick: false
        }
    }

    componentWillMount() {
        document.title = '欢迎登录 - MMALL管理系统';
        this.setState({
            redirect: client.getUrlParam('redirect') || '/'
        });
    }

    onInputChange(e) {
        // 利用元素的name属性，一个函数区分全部输入
        let target = e.target.name;
        this.setState({
            [target]: e.target.value
        });
    }

    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    async onSubmit() {
        if (this.state.activeClick) {
            return;
        }
        this.state.activeClick = true;
        let params = {
            username: this.state.username,
            password: this.state.password
        }
        let msg = '';
        for (let [key, value] of Object.entries(params)) {
            if (!String(value).trim()) {
                msg = key === 'username' ? '用户名' : '密码';
                client.errorTip(`请填写正确的${msg}`);
                return;
            }
        }
        try {
            let res = await client.request('/manage/user/login.do', params);
            client.saveStorage('userinfo', res);
            client.successTip('登陆成功');
            this.state.activeClick = false;
            this.props.history.push(this.state.redirect);
        } catch (err) {
            client.errorTip(err);
            this.state.activeClick = false;
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
                                    onChange={this.onInputChange.bind(this)}
                                    onKeyUp={this.onInputKeyUp.bind(this)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={this.onInputChange.bind(this)}
                                    onKeyUp={this.onInputKeyUp.bind(this)} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit.bind(this)}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;