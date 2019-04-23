import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(promise));

export default store;

/**
 *  处理promise的中间件
 *  执行promise
 *  将action的payload替换为返回的数据
 *  return返回的数据
 */
function promise() {
    return (next) => (action) => {
        let { type, payload, key, handle } = action;
        if (Object.prototype.toString.call(payload) === '[object Promise]') {
            return payload.then((result) => {
                next({ type, payload: result, key, handle });
                return result;
            }).catch((error) => {
                next({ type, payload: error, key, handle });
                throw error;
            });
        }
        return next(action);
    }
}

/**
 *  初始化action
 *  将action文件的配置转化为可以dispatch的action
 *  根据函数名称自动生成type
 *  添加key和handle
 */
export function createActions(config) {
    let result = {};
    for (let key in config) {
        result[key] = (data) => {
            let action = config[key](data);
            if (action.payload === undefined) {
                store.dispatch({ type: key, payload: action });
                return action;
            } else {
                store.dispatch({ type: key, payload: action.payload, key: action.key, handle: action.handle });
                return action.payload;
            }
        };
    }
    return result;
}
