import * as actions from '../actions/system';

import { SET_LOADING, SET_COLLAPSED } from '../actions/system';

const initState = {
    loading: false,
    collapsed: false,
};

export function system(state = initState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, ...action.preload };
        case SET_COLLAPSED:
            return { ...state, ...action.preload };
        default:
            return state
    }
}
