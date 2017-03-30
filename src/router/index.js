let vmRoot;             //全局vm
let states = {};    //记录所以状态对应vm内容
let $def = $.Deferred();
//路由定义
let routerConfig = [
    {
        name: 'home',
        viewTarget: 'mainPage'
    },
    {
        name: 'detail',
        viewTarget: 'mainPage'
    }
];


let addState = (path, vm, html)=>{
    states[path] = {
        vm: vm,
        html: html
    }
};

//设置显示内容页组件
avalon.component('ms-page-view', {
    template: '<div ms-html="@page" class="ms-view"></div>',
    defaults: {
        page: '&nbsp;',
        path: 'no',
        onReady(e) {
            let path = e.vmodel.path;
            let state = states[path];
            let vm = avalon.vmodels[state.vm.$id] = state.vm;
            vm.init && vm.init();
            setTimeout(function() {//必须等它扫描完这个template,才能替换
                e.vmodel.page = state.html;
                $def.resolve({path:path});
            },100)
        },
        onDispose(e) {
            let path = e.vmodel.path;
            let state = states[path];
            let vm = state.vm;
            let render = vm.render;
            render && render.dispose();
            //竟然用了delete, 大神厉害
            delete avalon.vmodels[vm.$id]
        }
    }
});

let  getPage = function(path){
    path = path.slice(1);
    return '<xmp is="ms-page-view" class="view-container" ms-widget="{path:\'' + path + '\'}"><xmp>';
};

let  addStateRouter = function(){
    routerConfig.forEach((objRoute)=>{
        let pathname = objRoute.name;
        let viewTarget = objRoute.viewTarget;
        let html = require('views/' + pathname + '/view.html');
        let vm = require('views/' + pathname + '/vmodel.js');
        addState(pathname, vm.vm, html);
        avalon.router.add("/"+pathname, function(a) {
            vmRoot.currPath = this.path;
            vmRoot[viewTarget] = getPage(this.path);
        })
    });
};

module.exports = init = function(){
    vmRoot = avalon.define({
        $id: "root",
        currPath: '',               //当前路径k
        mainPage: '<p></p>'         //当前页面
    });

    addStateRouter();

    avalon.history.start({
        root: "/home"
    });

    avalon.history.setHash('/home');

    avalon.ready(function() {
        avalon.scan(document.body);

    });
    return $def.promise();
};