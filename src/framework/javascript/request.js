/**
 * Created by zhangjuncheng on 2019/4/17.
 */
import axios from 'axios';
import configRequest from 'src/config/request'

export default axios;

function createInstance({ baseURL = '', headers = {}, withCredentials = true } = configRequest.instance) {
    return axios.create({
        baseURL: baseURL,
        method: 'post',
        headers: headers,
        withCredentials: withCredentials
    });
}

const instance = createInstance();

instance.interceptors.request.use(function (config) {
    let { loading = true, url, data, method } = config;
    loading && configRequest.showLoading();
    config.url = restfulUrl(url, data);
    if (method === 'get') {
        config.params = data;
    }
    if (configRequest.requestResolve) {
        return configRequest.requestResolve(config);
    } else {
        return config;
    }
}, function (error) {
    configRequest.hideLoading();
    configRequest.showError('请求发送失败,请检查参数');
    configRequest.requestReject && configRequest.requestReject(error);
    throw error;
});

instance.interceptors.response.use(function (response) {
    configRequest.hideLoading();
    if (configRequest.responseResolve) {
        return configRequest.responseResolve(response);
    } else {
        return response.data;
    }
}, function (error) {
    configRequest.hideLoading();
    if (error.response) {
        configRequest.showError(error.response.status + (errorMessage[error.response.status] || '请求失败,请稍后重试'))
    } else if (!error) {
        configRequest.showError('未知错误,请稍后重试');
    }
    configRequest.responseReject && configRequest.responseReject(error);
    throw error;
});

export function createApi(apiConfig) {
    let api = {};
    for (let key in apiConfig) {
        if (apiConfig.hasOwnProperty(key)) {
            api[key] = function (data, config) {
                return instance.request({ ...apiConfig[key], ...config, data: data });
            };
        }
    }
    return api;
}

function restfulUrl(url, data) {
    if (url.indexOf('/:') > 0) {
        let key = url.split('/:')[1].split('/')[0];
        return restfulUrl(url.replace(`/:${key}`, data[key] ? `/${data[key]}` : ''), data);
    }
    return url;
}

export function promiseAll(promiseArray) {
    configRequest.showLoading();
    return tryPromise(promiseArray, []).then((result) => {
        configRequest.hideLoading();
        return result;
    });
}

function tryPromise(promiseArray, data) {
    if (promiseArray.length === 0) {
        return data;
    }
    let promise = promiseArray.shift();
    if (isPromise(promise)) {
        return promise.then((result) => {
            data.push(result);
            return tryPromise(promiseArray, data);
        }).catch((error) => {
            data.push(error);
            return tryPromise(promiseArray, data);
        })
    } else {
        return tryPromise(promiseArray, data);
    }
}

function isPromise(data) {
    return Object.prototype.toString.call(data) === '[object Promise]';
}

const errorMessage = {
    '400': '请求的传入参数错误',
    '401': '您没有权限或过期',
    '403': '禁止请求',
    '404': '没有找到请求地址',
    '500': '后台发生错误',
    '504': '请求超时'
};
