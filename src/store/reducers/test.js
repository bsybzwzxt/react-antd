

export const test = createReducer(initialState, {
    [LOGIN](state, action) {
        return state.merge({ login: action.payload });
    },
    [GET_ACCESS_LIST](state, action) {
        return state.merge({ accessList: action.payload });
    }
});
