import { fromJS } from 'immutable';
import { SET_LOADING, SET_COLLAPSED } from '../actions/system';
import { LOGIN, GET_ACCESS_LIST } from '../actions/test';

const initialState = fromJS({
    loading: false,
    collapsed: false,
});

// export const test = createReducer(initialState, {
//     [LOGIN](state, action) {
//         return state.merge({ login: action.payload });
//     },
//     [GET_ACCESS_LIST](state, action) {
//         return state.merge({ accessList: action.payload });
//     }
// });


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
