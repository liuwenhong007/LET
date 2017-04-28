/**
 * Created by DDT on 2016/8/23.
 */
var service = require('modules/service');
var action = 'account/genid';

module.exports = {
    getData: function(data){
        return service.getData(action, data || {});
    }
};