avalon.component('ms-page-sideBar', {
    template: require('./template.html'),
    defaults: {
        path:'',
        onReady(e) {
           console.log(this.path)
        },
        onDispose(e) {
            
        }
    }
});