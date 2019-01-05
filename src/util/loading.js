const createSingle = (fn) => {
    const _this = this;
    let num = 0;
    const LOADING = Symbol('loading');
    // 用于记录调用了多少此单例
    const getNum = () => {
        return num;
    };

    const decreaseNum = (value = 1) => {
        if (!createSingle[LOADING]) {
            num = 0;
        } else {
            num = num - value;
            if (num < 1) {
                num = 1;
            }
        }
    };

    const el = () => {
        num++;
        return createSingle[LOADING] || (createSingle[LOADING] = fn.apply(_this, arguments));
    };

    return {
        getNum,
        decreaseNum,
        el
    }
};

const createLoading = () => {
    const loading = document.createElement('div');
    const imgSrc = require('assets/loading.gif');
    loading.className = '__loading';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background: url(${imgSrc}) center center no-repeat;
        background-size: 50px 50px;
        display: none;
    `;
    document.documentElement.appendChild(loading);
    return loading;
};

const loadingCreater = createSingle(createLoading);

export default loadingCreater;