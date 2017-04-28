/**
 * 系统配置文件
 * Created by DDT on 2016/2/23.
 */
var DEFAULT_SETTING = {
    api_host: (window.cfg && window.cfg.api_host) || '/TEST_SEV',                   //api服务地址名
    app_api_host: (window.cfg && window.cfg.app_api_host) || '/APP_SEV',                //app_api服务地址名
    stake_host: (window.cfg && window.cfg.stake_host) || 'http://210.21.94.38/TEST_SEV',
    stake_host_map: (window.cfg && window.cfg.stake_host_map) || null,
    push_addr: (window.cfg && window.cfg.push_addr) || '//210.21.94.38:81',    //接收push地址  'http://10.101.172.36:81';//'http://210.21.94.38:81';;//'127.0.0.1:81';
    version: (window.cfg && window.cfg.version != undefined) ? window.cfg.version : '1.0'
};

module.exports = {
    get: function(key){
        if(key){
            return DEFAULT_SETTING[key];
        }else{
            return DEFAULT_SETTING;
        }
    },
    set: function(key, value){
        if(key && value){
            DEFAULT_SETTING[key] = value;
        }
    }
};