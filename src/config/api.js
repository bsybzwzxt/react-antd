import { setLoading } from 'src/store/actions/system'
import store from 'src/store'
import { message } from 'antd';

export default {
    // 实例默认参数
    instance: {
        headers: { a: 1 },
    },
    // 展示loading方法
    showLoading() {
        store.dispatch(setLoading(true));
    },
    // 隐藏loading方法
    hideLoading() {
        store.dispatch(setLoading(false));
    },
    // 展示错误信息方法
    showError(errorMessage) {
        message.error(errorMessage);
    }
};

// 实例默认参数
// instance: {}
// 展示loading方法
// showLoading() {}
// 隐藏loading方法
// hideLoading() {}
// 展示错误信息方法
// showError(errorMessage) {}
// 请求发送前回调
// requestResolve(config) {}
// 请求发送错误回调
// requestReject(error) {}
// 请求返回后回调
// responseResolve(response) {}
// 请求返回错误回调
// responseReject(error) {}
