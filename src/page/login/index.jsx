import React from 'react';

import './index.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onInputChange(e) {
        // 利用元素的name属性，一个函数区分全部输入
        let target = e.target.name;
        this.setState({
            [target]: e.target.value
        });
    }

    onSubmit() {
        console.log(this.state.username, this.state.password);
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

export default Login;