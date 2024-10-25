import axios from '../axios';

// 统一axios的get、post等调用方式
export function createHttp(axios) {
    const httpUtil = {
        axios,
        get(url, pars, config) {
            return axios.get(toQueryUrl(url, pars), config)
        },
    };

    ['post', 'put'].map(method => {
        httpUtil[method] = (url, pars, config) => {
            return axios[method](url, pars, config)
        }
    })
    httpUtil.delete = (url, pars, config) => {
        return axios.delete(url, pars && { data: pars }, config)
    }
    httpUtil.toQueryUrl = toQueryUrl;
    return httpUtil
}

export default createHttp(axios);

function toQueryUrl(rawUrl, pars) {
    if (pars) {
        pars.f_rnd = +new Date(); //防止火狐缓存GET请求
        rawUrl += rawUrl.indexOf('?') > -1 ? '&' : '?';
        rawUrl += Object.keys(pars).map(key => key + '=' + encodeURIComponent(pars[key])).join('&');
    }
    return rawUrl
};
