
(function () {
    'use strict';

    var _head = document.querySelector('head');
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.id = '_chome_ext';
    _script.src = 'https://jackdizhu.github.io/html_demo/cdn/chome_ext.js';
    _script.onload = function () {
        var _this = document.querySelector('#_chome_ext');
        var str = _this.getAttribute('data-ext');
        var _obj = JSON.parse(str);
        index(_obj);
    }
    _head.appendChild(_script);

    console.log('::chome_ext');
    var _time;
    // 判断是否删除
    function is_empty(_this) {
        var ht = _this.innerHTML;
        if(ht != ''){
            index();
        }else{
            clearTimeout(_time);
        }
    }
    // 循环遍历 根据域名 删除DOM
    function index(_obj) {
        var u = window.location.href;
        var U = {
            // baidu:{
            //     R: 'baidu.com',
            //     id:['content_right']
            // }
        };
        if(_obj){
            U = _obj;
        }
        var R,k,_this;
        for(k in U){
            R = new RegExp("^http[s]?:\/\/[a-z.]+"+U[k].R+"");
            if(R.test(u)){
                for(var i = 0;i<U[k].id.length;i++){
                    if(document.getElementById(U[k].id[i])){
                        // document.getElementById(U[k].id[i]).style.display = 'none';
                        console.log('----#'+U[k].id[i]+'');
                        _this = document.getElementById(U[k].id[i]);
                        _this.innerHTML = '';
                        _time = setTimeout(function () {
                            is_empty(_this);
                        },3000);
                    }
                }
            }
        }
    }
    setTimeout(index(),0);

})();
