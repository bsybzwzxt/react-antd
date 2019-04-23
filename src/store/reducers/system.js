import { fromJS } from 'immutable';
import { SET_LOADING, SET_COLLAPSED } from '../actions/system';
import { LOGIN, GET_ACCESS_LIST } from '../actions/test';

const initialState = fromJS({
    loading: false,
    collapsed: false,
});

export function system(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return state.merge(action.payload);
        case SET_COLLAPSED:
            return state.merge(action.payload);
        default:
            return state
    }
}
