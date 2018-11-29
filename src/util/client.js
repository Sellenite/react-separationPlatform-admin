class Client {
    constructor(host = '') {
        this.host = host;
    }

    request(url = '', data = {}, type = 'post') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type,
                url: this.host + url,
                dataType: 'json',
                data,
                success(res) {
                    // 成功
                    if (res.status === 0) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (res.status === 10) {
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error(err) {
                    typeof reject === 'function' && reject(res.msg || res.data);
                }
            });
        });
    }

    doLogin() {
        window.location.href = `/login?redirect=${window.location.pathname}`;
    }
};

export default Client;