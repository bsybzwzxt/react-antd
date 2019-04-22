import system from 'src/api/system'

export const testActions = {
    login: function (data) {
        return function (dispatch, getState) {
            return system.getAccessList(data).then((result) => {
                return dispatch({ type: 'login', payload: result });
            }).catch((error) => {
                throw dispatch({ type: 'login', payload: error });
            });
        }
    },
    getAccessList: function (data) {
        return function (dispatch, getState) {
            return system.getAccessList(data).then((result) => {
                return dispatch({ type: 'getAccessList', key: 'accessList', payload: result });
            }).catch((error) => {
                throw dispatch({
                    type: 'getAccessList', payload: error, method: function (state) {
                        return state.merge({ accessList: error });
                    }
                });
            });
        }
    }
};

export const testState = {};
