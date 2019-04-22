export const systemActions = {
    setLoading: function (data) {
        return function (dispatch) {
            return dispatch({ type: 'setLoading', key: 'loading', payload: data });
        }
    },
    setCollapsed: function (data) {
        return function (dispatch) {
            return dispatch({ type: 'setCollapsed', key: 'collapsed', payload: data });
        }
    },
};

export const systemState = {
    collapsed: false,
    loading: false
};
