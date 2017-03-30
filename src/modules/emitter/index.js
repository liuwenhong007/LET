/**
 * 定义使用的事件触发器
 * Created by DDT on 2015/11/6.
 */
var Emitter = require('component-emitter');
var globalEmitter = new Emitter;

module.exports = {
    global: globalEmitter,  //全局绑定事件
    instance: Emitter       //自定义绑定对象触发
};