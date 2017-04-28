/**
 * 调用接口模块
 * Created by DDT on 2015/10/27.
 */
"use strict";

var config = require('common/js/config');

var _innerFn = {
    genData: function (data) {
        var reqData = JSON.stringify(data);
        return {request_data: reqData};
    },
    onSucceed: function (data, $def, ops) {
        var resData = data;

        if(ops.isJson){
            $def.resolve(resData);
        }
        //唯一成功代码判断
        else if (resData.errorCode === 'success') {
            if (resData.data && typeof resData.data != 'string') {
                resData.list = resData.data;
            }
            $def.resolve(resData);
        } else {

            this.dealError(resData.errorCode);
            $def.reject(resData);
        }
    },
    onError: function (XMLHttpRequest, textStatus, errorThrown, $def) {
        //错误处理
        $def.reject();
    },
    /**
     * 处理失败
     * @param code
     */
    dealError: function (code) {
    }
};

var objFn = {
    getHost: function (isJsonp) {
        if(isJsonp){
            var stake_host = config.get('stake_host');
            return stake_host;
        }else{
            return config.get('api_host');
        }
    },
    getAppHost: function () {
        return config.get('app_api_host');
    },
    /**
     * 获取接口服务
     * @param uri
     * @param data
     * @param ops
     */
    getData: function (uri, data, ops) {
        var $def = $.Deferred();
        var _self = this;
        var url = '';
        ops = ops || {};
        var isJsonp = ops.dataType == 'jsonp';
        if(isJsonp||ops.isJson){
            ops.type = 'GET';
        }
        if(ops.isJson){
            url = uri;
            ops.dataType = 'json';
        }else{
            if (isDebug) {
                var testSchema = '';
                ops.debugType = ops.debugType || '';
                url = '/debug/data/' + testSchema + '/' + uri + ops.debugType + '.json';
            } else {
                url = _self.getHost(isJsonp) + '/' + local + '/' + formSrc + '/' + schema + '/' + uri;
            }
        }

        $.ajax($.extend({
            url: url,
            data: _innerFn.genData(data)
        }, ops)).then(function (data) {
            if(!ops.isJson){
                data = JSON.parse(data);
            }

            _innerFn.onSucceed(data, $def, ops);
        }, function (XMLHttpRequest, textStatus, errorThrown) {
            _innerFn.onError(XMLHttpRequest, textStatus, errorThrown, $def);
        });
        return $def.promise();
    }
};

module.exports = objFn;