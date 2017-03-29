/**
 * Created by Administrator on 2017/3/13.
 */
require('common/js/init.js');
require('include/header');
require('include/sidebar');
require('include/footer');
let init = require('router');
avalon.config({debug: true});
init().then(function () {
    require.ensure('common/js/base.js', function(require){
        require('common/js/base.js');
    });
});