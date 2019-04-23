import system from 'src/api/system'
import { createActions } from "src/store/index";

export const testState = {};

export const testConfig = {
    login: function (data) {
        return system.login(data).then((result) => {
            console.log(result);
            return result;
        }).catch((error) => {
            console.log(error);
            throw error;
        })
    },
    loadLogin: function (data) {
        return {
            payload: system.login(data).then((result) => {
                return result;
            }).catch((error) => {
                return { username: 'zh', password: '123', remember: false };
            }),
            handle: function (state, payload) {
                return state.merge({ asd: payload });
            }
        }
    },
    getAccessList: function (data) {
        return {
            key: 'accessList',
            payload: system.getAccessList(data).then((result) => {
                return result;
            }).catch((error) => {
                throw error;
            })
        }
    }
};

export const testActions = createActions(testConfig);
