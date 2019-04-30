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
 * 将config配置转化成reducer
 */
function transConfig(config) {
    let result = {};
    let newConfig = createLoading(config);
    for (let key in newConfig) {
        if (newConfig.hasOwnProperty(key)) {
            result[key] = function (state, { type, payload, key, handle }) {
                return handle ? handle(state, payload) : state.set(key || type, payload);
            }
        }
    }
    return result;
}

/**
 * 如果存在loadingkey则自动生成一条action
 */
function createLoading(config) {
    let result = {};
    for (let key in config) {
        if (config.hasOwnProperty(key)) {
            let loadingKey = config[key].loadingKey;
            if (loadingKey) {
                result[`${key}Loading`] = {
                    key: loadingKey,
                    payload: (data) => data
                }
            }
        }
    }
    return { ...config, ...result };
}
