import { initApi } from 'src/framework/api/ajax';

const api = {
    login: {
        method: 'post',
        url: '/api/login'
    },
    getAccessList: {
        method: 'get',
        url: '/api/getAccess',
        loading: true,
        header: {},
    }
};

export default initApi(api)
// module.exports = initApi(api);

