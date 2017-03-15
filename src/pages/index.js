/**
 * Created by Administrator on 2017/3/13.
 */
require('common/js/init.js');

$(function () {
    avalon.component('ms-view',{
        template:'<div class="view">{{@data}}<slot name="content" /></div>',
        defaults: {
            content: "",
            data:"data"
        }
    });
    avalon.component('ms-button',{
        template:'<div class="view"><ms-view :widget="{data:@data}" ></ms-view>{{@data}}<slot name="content" /></div>',
        defaults: {
            content: "",
            data:"data"
        }
    });
    avalon.define({
        $id: "test",
        aa:"司徒正美测试"
    });
    avalon.scan()

});