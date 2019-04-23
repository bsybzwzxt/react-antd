import { createActions } from 'src/store/index';

export const systemState = {
    collapsed: false,
    loading: false
};

export const systemConfig = {
    setLoading: function (data) {
        return {
            key: 'loading', payload: data
        }
    },
    setCollapsed: function (data) {
        return {
            key: 'collapsed', payload: data
        }
    }
};

export const systemActions = createActions(systemConfig);

