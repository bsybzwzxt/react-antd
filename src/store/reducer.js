import { fromJS } from 'immutable';
import { combineReducers } from "redux-immutable";
import { testActions, testState } from './actions/test';
import { systemActions, systemState } from './actions/system';

export default combineReducers({
    test: createReducer(fromJS(testState), transAction(testActions)),
    system: createReducer(fromJS(systemState), transAction(systemActions))
});


function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

function transAction(actions) {
    let result = {};
    for (let action in actions) {
        result[action] = function (state, { type, payload, key, method }) {
            return method ? method(state) : state.set(key || type, payload);
        }
    }
    return result;
}
