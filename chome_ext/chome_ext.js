(function () {
    'use strict';

    function $(str) {
        return document.querySelector(str)
    }
    window._chome_ext = {
        baidu:{
            R: 'baidu.com',
            id:['#content_right','.fxuQda','.c-container<.c-icon-v3','.c-container<.c-icon-v2','.c-container<.c-icon-v1']
        },
        sogou:{
            R: 'sogou.com',
            id:['#right']
        },
        liewen:{
            R: 'liewen.cc',
            id:['#cs_right_bottom']
        },
        bxwx9:{
            R: 'bxwx9.org',
            id:['#_cs_bf_item','#cs_kd_form']
        }
    };
    var _this = $('#_chome_ext');
    var str = JSON.stringify(window._chome_ext);
    _this.setAttribute('data-ext',str);

    // 改写window.open 方法
    function edit_windowOpen() {
        var _arg = arguments;
        window.open = function () {
            console.log('window.open 1');
        }
    }
    // 改写onkeydow 方法
    function edit_keyDown() {
        document.onkeydown = function (event) {
            event.stopPropagation();
            event.preventDefault();
            var _arg = arguments;
            console.log('onkeydown 1');
        }
    }

    setTimeout(function () {
        edit_windowOpen();
        edit_keyDown();
    },800);

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
        if($(id)){
            // $(id).style.display = 'none';
            var _this = $(id);
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
        if($(_className)){
            var _this = $(_className);
            get_parentNode(_this.parentNode,str);
        }
    }
    // 清除所有 a _blank
    function del_a() {
        var _a = $All('a');
        for (var i = 0; i < _a.length; i++) {
            if(_a[i].getAttribute('target') == '_blank'){
                del_this(_a[i]);
            }
        }
        if($All('a')){
            var _this = $('iframe');
            del_this(_this);
        }
    }
    // 清除所有 iframe
    function del_iframe() {
        if($('iframe')){
            var _this = $('iframe');
            _this.parentNode.removeChild(_this);
        }
    }
    // 删除DOM 本身
    function del_this(_this) {
        if(_this){
            _this.parentNode.removeChild(_this);
        }
    }
    // 所有页面执行
    function del_all() {
        del_iframe();
        del_a();

        // 修改原生方法
        edit_windowOpen();
        edit_keyDown();
    }
    // 改写window.open 方法
    function edit_windowOpen() {
        var _arg = arguments;
        window.open = function () {
            console.log('window.open 2');
        }
    }
    edit_windowOpen();
    // 改写onkeydow 方法
    function edit_keyDown() {
        document.onkeydown = function (event) {
            // event.stopPropagation();
            // event.preventDefault();
            var _arg = arguments;
            console.log('onkeydown 2');
        }
    }
    edit_keyDown();
    // 循环遍历 根据域名 删除DOM
    function index(_obj) {
        // 所有页面执行
        del_all();

        var u = window.location.href;
        var U = {
            // baidu:{
            //     R: 'baidu.com',
            //     id:['#content_right','.fxuQda','.c-container<.c-icon-v3','.c-container<.c-icon-v2']
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
                    if(/^[#|.]{1}[A-Za-z0-9_-]+$/.test(U[k].id[i])){
                        del_id(U[k].id[i]);
                    }else if(/^([#|.]{1}[A-Za-z0-9_-]+)[<]{1}([#|.]{1}[A-Za-z0-9_-]+)$/.test(U[k].id[i])){
                        del_className(U[k].id[i]);
                    }
                }
            }
        }
    }

    // 初始化执行
    (function () {
        var _this = $('#_chome_ext');
        var str = _this.getAttribute('data-ext');
        var _obj = JSON.parse(str);
        index(_obj);

        // 页面滚动时调用
        var scrollT1 = 0;
        window.onscroll = function () {
            scrollT1 = new Date().getTime();
            setTimeout(function () {
                var scrollT2 = new Date().getTime();
                if(scrollT2 - scrollT1 > 700){
                    index(_obj);
                }
            },800);
        }
    }())
})();
