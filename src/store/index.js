import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;

/**
 * 处理promise的中间件
 * 执行promise
 * 如果存在loadingKey则自动dispatch
 * 将action的payload替换为返回的数据
 * return返回的数据
 **/
function promiseMiddleware({ dispatch }) {
    return (next) => (action) => {
        let { type, payload, key, handle, loadingKey, loadingHandle } = action;
        if (Object.prototype.toString.call(payload) === '[object Promise]') {
            if (loadingKey) {
                dispatch({ type: `${type}Loading`, payload: true, key: loadingKey, handle: loadingHandle });
            }
            return payload.then((result) => {
                if (loadingKey) {
                    dispatch({ type: `${type}Loading`, payload: false, key: loadingKey, handle: loadingHandle });
                }
                next({ type, payload: result, key, handle });
                return result;
            }).catch((error) => {
                if (loadingKey) {
                    dispatch({ type: `${type}Loading`, payload: false, key: loadingKey, handle: loadingHandle });
                }
                next({ type, payload: error, key, handle });
                throw error;
            });
        }
        return next(action);
    }
}

/**
 * 初始化action
 * 将action使用dispatch包装
 * 根据函数名称自动生成type
 * type: 匹配的函数名称
 * payload: 数据
 * key: 插入state的节点名称，没有则使用type，默认使用set的方式插入
 * handle: 手动设置插入state的方式
 * loadingKey: 自动生成loading状态，并插入state的节点名称
 * loadingHandle: 手动设置loading插入state的方式
 **/
export function createActions(actionsConfig) {
    let result = {};
    for (let key in actionsConfig) {
        if (actionsConfig.hasOwnProperty(key)) {
            result[key] = (data, config) => {
                let payload = actionsConfig[key].payload(data, config);
                store.dispatch({ ...actionsConfig[key], type: key, payload: payload });
                return payload;
            };
        }
    }
    return result;
}
