import { createApi } from 'src/framework/javascript/request';

const api = {
    login: {
        method: 'post',
        url: '/api/login'
    },
    getAccessList: {
        method: 'get',
        url: '/api/getAccessList'
    }
};

export default createApi(api)
// module.exports = initApi(api);

