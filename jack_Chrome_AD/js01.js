
(function () {
    'use strict';

    // var _head = document.querySelector('head');
    // var _script = document.createElement('script');
    // _script.type = 'text/javascript';
    // _script.id = '_chome_ext';
    // _script.src = 'https://jackdizhu.github.io/html_demo/cdn/chome_ext.js';
    // _script.onload = function () {
    //     var _this = document.querySelector('#_chome_ext');
    //     var str = _this.getAttribute('data-ext');
    //     var _obj = JSON.parse(str);
    //     index(_obj);
    // }
    // _head.appendChild(_script);

    console.log('::chome_ext');
    var _time,_time2;
    // 判断是否删除
    function is_empty(_this) {
        var ht = _this.innerHTML;
        if(ht != ''){
            index();
        }else{
            clearTimeout(_time);
        }
    }
    // 删除ID 内容
    function del_id(id) {
        if(document.querySelector(id)){
            // document.querySelector(id).style.display = 'none';
            var _this = document.querySelector(id);
            _this.innerHTML = '';
        }
    }
    // 删除ClassName 内容
    function del_className(className) {
        function get_parentNode(_this,str) {
            if(!_this){
                return null;
            }
            var cls = _this.className;
            // R.test(cls)
            if(cls && (cls.indexOf(str) >= 0)){
                _this.innerHTML = '';
                del_className(className);
            }else{
                _this = _this.parentNode;
                get_parentNode(_this,str);
            }
        }
        var R = /^([#|.]{1}[A-Za-z0-9_-]+)[<]{1}([#|.]{1}[A-Za-z0-9_-]+)$/;
        var A = className.match(R);
        var _className = className.replace(/\</,' ');
        var str = A['1'].replace(/\./,'');
        var _R = new RegExp('[ |"]'+str+'[ |"]');
        if(document.querySelector(_className)){
            var _this = document.querySelector(_className);
            get_parentNode(_this.parentNode,str);
        }
    }
    // 循环遍历 根据域名 删除DOM
    function index(_obj) {
        var u = window.location.href;
        var U = {
            baidu:{
                R: 'baidu.com',
                id:['#content_right','.fxuQda','.c-container<.c-icon-v3','.c-container<.c-icon-v2']
            }
        };
        if(_obj){
            U = _obj;
        }
        var R,k,_this;
        for(k in U){
            R = new RegExp("^http[s]?:\/\/[a-z.]+"+U[k].R+"");
            if(R.test(u)){
                for(var i = 0;i<U[k].id.length;i++){
                    if(/^[#|.]{1}[A-Za-z0-9_-]+$/.test(U[k].id[i])){
                        del_id(U[k].id[i]);
                    }else if(/^([#|.]{1}[A-Za-z0-9_-]+)[<]{1}([#|.]{1}[A-Za-z0-9_-]+)$/.test(U[k].id[i])){
                        del_className(U[k].id[i]);
                    }
                }
            }
        }
    }
    setTimeout(index(),1500);
    // index();
    // var _time = setInterval(function () {
    //     index();
    // },3000);

})();