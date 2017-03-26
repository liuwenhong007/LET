/**
 * Created by Administrator on 2017/3/13.
 */
require('common/js/init.js');
let init = require('router');
require('include/header');
require('include/sidebar');
init().then(function () {
    require('common/js/base.js');
});