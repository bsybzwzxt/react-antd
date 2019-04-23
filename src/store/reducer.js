import { fromJS } from 'immutable';
import { combineReducers } from "redux-immutable";
import { testConfig, testState } from './actions/test';
import { systemConfig, systemState } from './actions/system';

export default combineReducers({
    test: createReducer(fromJS(testState), transConfig(testConfig)),
    system: createReducer(fromJS(systemState), transConfig(systemConfig))
});

/**
 * 通过type自动匹配reducer
 */
function createReducer(initialState, handle) {
    return function reducer(state = initialState, action) {
        if (handle.hasOwnProperty(action.type)) {
            return handle[action.type](state, action);
        } else {
            return state;
        }
    }
}

/**
 *  将config配置转化成reducer
 *  type: 匹配的函数名称
 *  payload: 数据
 *  key: 插入state的节点名称，没有则使用type，默认使用set的方式插入
 *  handle: 手动设置插入state的方式
 */
function transConfig(config) {
    let result = {};
    for (let key in config) {
        result[key] = function (state, { type, payload, key, handle }) {
            return handle ? handle(state, payload) : state.set(key || type, payload);
        }
    }
    return result;
}
