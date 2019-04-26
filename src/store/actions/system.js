import { createActions } from 'src/store/index';

export const systemState = {
    collapsed: false,
    loading: false
};

export const systemConfig = {
    setLoading: {
        key: 'loading',
        payload: function (data) {
            return data;
        }
    },
    setCollapsed: {
        key: 'collapsed',
        payload: (data) => data
    },
};

export const systemActions = createActions(systemConfig);

