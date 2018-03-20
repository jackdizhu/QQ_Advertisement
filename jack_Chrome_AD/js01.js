
(function () {
    'use strict';

    var _http = {
        /*传递参数对象，返回拼接之后的字符串*/
        /*{‘name’:’jack,’age’:20}=>  name=jack&age=20&*/
        getParmeter: function (data) {
            var result = "";
            for (var key in data) {
                result = result + key + "=" + data[key] + "&";
            }
            /*将结果最后多余的&截取掉*/
            return result.slice(0, -1);
        },
        /*实现ajax请求*/
        req: function (obj) {
            /*1.判断有没有传递参数，同时参数是否是一个对象*/
            if (obj == null || typeof obj != "object") {
                return false;
            }
            /*2.获取请求类型,如果没有传递请求方式，那么默认为get*/
            var type = obj.type || 'get';
            /*3.获取请求的url  location.pathname:就是指当前请求发起的路径*/
            var url = obj.url || location.pathname;
            /*4.获取请求传递的参数*/
            var data = obj.data || {};
            /*4.1获取拼接之后的参数*/
            data = this.getParmeter(data);
            /*5.获取请求传递的回调函数*/
            var success = obj.success || function () { };

            /*6:开始发起异步请求*/
            /*6.1:创建异步对象*/
            var xhr = new XMLHttpRequest();
            /*6.2:设置请求行,判断请求类型，以此决定是否需要拼接参数到url*/
            if (type == 'get') {
                url = url + "?" + data;
                /*重置参数，为post请求简化处理*/
                data = null;
            }
            xhr.open(type, url);
            /*6.2:设置请求头:判断请求方式，如果是post则进行设置*/
            if (type == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            /*6.3:设置请求体,post请求则需要传递参数*/
            xhr.send(data);

            /*7.处理响应*/
            xhr.onreadystatechange = function () {
                /*8.判断响应是否成功*/
                if (xhr.status == 200 && xhr.readyState == 4) {
                    /*客户端可用的响应结果*/
                    var result = null;
                    /*9.获取响应头Content-Type ---类型是字符串*/
                    var grc = xhr.getResponseHeader("Content-Type");
                    /*10.根据Content-Type类型来判断如何进行解析*/
                    if (grc.indexOf("json") != -1) {
                        /*转换为js对象*/
                        result = JSON.parse(xhr.responseText);
                    }
                    else if (grc.indexOf("xml") != -1) {
                        result = xhr.responseXML;
                    }
                    else {
                        result = xhr.responseText;
                    }
                    /*11.拿到数据，调用客户端传递过来的回调函数*/
                    success(result);
                }
            }

        }
    };

    function $(str) {
        return document.querySelector(str)
    }

    var _head = $('head');
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.id = '_chome_ext';
    // _script.src = 'http://jackdizhu.github.io/advertisement/chome_ext/chome_ext.js?t=' + new Date().getTime();
    _http.req({
        url: 'http://jackdizhu.github.io/advertisement/chome_ext/chome_ext.js',
        type: 'GET',
        data: {},
        success: function (res) {
            _script.innerHTML = res
            _head.appendChild(_script);
        }
    })

})();
