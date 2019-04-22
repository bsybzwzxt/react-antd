/**
 * Created by zhangjuncheng on 2019/4/17.
 */
import axios from 'axios';
import configApi from 'src/config/api'

function createInstance({ baseURL = '', headers = {}, withCredentials = true } = configApi.instance) {
    return axios.create({
        baseURL: baseURL,
        method: 'post',
        headers: headers,
        withCredentials: withCredentials
    });
}

export const instance = createInstance();

instance.interceptors.request.use(function (config) {
    let { loading = true, url, data, method } = config;
    loading && configApi.showLoading();
    config.url = restfulUrl(url, data);
    if (method === 'get') {
        config.params = data;
    }
    if (configApi.requestResolve) {
        return configApi.requestResolve(config);
    } else {
        return config;
    }
}, function (error) {
    configApi.hideLoading();
    configApi.showError('请求发送失败,请检查参数');
    configApi.requestReject && configApi.requestReject(error);
    throw error;
});

instance.interceptors.response.use(function (response) {
    configApi.hideLoading();
    if (configApi.responseResolve) {
        return configApi.responseResolve(response);
    } else {
        return response.data;
    }
}, function (error) {
    configApi.hideLoading();
    if (error.response) {
        configApi.showError(error.response.status + (errorMessage[error.response.status] || '请求失败,请稍后重试'))
    } else if (!error) {
        configApi.showError('未知错误,请稍后重试');
    }
    configApi.responseReject && configApi.responseReject(error);
    throw error;
});

export function initApi(config) {
    let api = {};
    for (let key in config) {
        api[key] = function (data) {
            return instance.request({ ...config[key], data: data });
        };
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

const errorMessage = {
    '400': '请求的传入参数错误',
    '401': '您没有权限或过期',
    '403': '禁止请求',
    '404': '没有找到请求地址',
    '500': '后台发生错误',
    '504': '请求超时'
};
