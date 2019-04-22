import { initApi } from 'src/framework/api/ajax';

const api = {
    login: {
        method: 'post',
        url: '/api/login/:a/b/:c'
    },
    getAccessList: {
        method: 'get',
        url: '/api/getAccess'
    }
};

export default initApi(api)
// module.exports = initApi(api);

