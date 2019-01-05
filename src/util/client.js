import loadingCreater from './loading.js';

class Client {
    constructor(host = '') {
        this.host = host;
    }

    request(url = '', data = {}, type = 'post') {
        this.showLoading();
        return new Promise((resolve, reject) => {
            $.ajax({
                type,
                url: this.host + url,
                dataType: 'json',
                data,
                success: (res) => {
                    this.hideLoading();
                    // 成功
                    if (res.status === 0) {
                        // resolve，reject只能接受一个参数，多余的会被忽略
                        typeof resolve === 'function' && resolve(res.data);
                    } else if (res.status === 10) {
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: (err) => {
                    this.hideLoading();
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }

    doLogin() {
        window.location.href = `/login?redirect=${window.encodeURIComponent(window.location.pathname)}`;
    }

    saveStorage(name, value) {
        if (typeof value === 'object') {
            sessionStorage.setItem(name, JSON.stringify(value));
        } else {
            sessionStorage.setItem(name, value);
        }
    }

    loadStorage(name) {
        try {
            return JSON.parse(sessionStorage.getItem(name));
        } catch (err) {
            return sessionStorage.getItem(name);
        }
    }

    removeStorage(name) {
        sessionStorage.removeItem(name);
    }

    getUrlParam(key) {
        let params = window.location.search.substring(1);
        let regex = new RegExp(`(^|&)${key}=([^&]*)($|&)`);
        let result = params.match(regex) || [];
        return window.decodeURIComponent(result[2]) || '';
    }

    showLoading() {
        let loading = loadingCreater.el();
        loading.style.display = 'block';
    }

    hideLoading(force) {
        let loading = loadingCreater.el();
        if (force) {
            loadingCreater.decreaseNum(Infinity);
        } else {
            loadingCreater.decreaseNum(2);
        }
        // 所有叠加一起的loading全部完成后才会消失
        if (loadingCreater.getNum() === 1) {
            loading.style.display = 'none';
        }
    }

    successTip(msg) {
        msg = msg ? msg : '操作成功';
        alert(msg);
    }

    errorTip(err) {
        err = err ? err : '错误';
        alert(err);
    }

};

export default Client;