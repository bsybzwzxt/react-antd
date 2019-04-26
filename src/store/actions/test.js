import system from 'src/api/system'
import { createActions } from "src/store/index";

export const testState = {};

export const testConfig = {
    login: {
        payload: function (data, config) {
            return system.login(data, config).then((result) => {
                return result;
            })
        }
    },
    loadLogin: {
        payload: function (data) {
            return system.login(data).then((result) => {
                return result;
            }).catch((error) => {
                return { username: 'zh', password: '123', remember: false };
            })
        },
        handle: function (state, payload) {
            return state.merge({ config: payload });
        }
    },
    getAccessList: {
        key: 'accessList',
        payload: function (data, config) {
            return system.getAccessList(data, config).then((result) => {
                return result;
            }).catch((error) => {
                throw error;
            })
        },
        loadingKey: 'accessListLoading',
        // loadingHandle: function (state, payload) {
        //     return state.merge({ config: payload });
        // }
    }
};

export const testActions = createActions(testConfig);
