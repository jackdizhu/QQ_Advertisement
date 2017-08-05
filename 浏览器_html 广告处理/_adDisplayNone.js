
// 隐藏 对应 ID 的DOM 元素
(function() {
    'use strict';
    var u = window.location.href;
    var U = {
        baidu:{
            R: /^http[s]?:\/\/[a-z.]+baidu.com/,
            id:['content_right']
        }
    };
    var k;
    for(k in U){
        if(U[k].R.test(u)){
            for(var i = 0;i<U[k].id.length;i++){
                document.getElementById(U[k].id[i]).style.display = 'none';
            }
        }
    }

})();
// 02
(function() {
    'use strict';
    var u = window.location.href;
    var U = {
        baidu:{
            R: 'baidu.com',
            id:['content_right']
        }
    };
    var R;

    var k;
    for(k in U){
        R = new RegExp("^http[s]?:\/\/[a-z.]+"+U[k].R+"");
        if(R.test(u)){
            for(var i = 0;i<U[k].id.length;i++){
                document.getElementById(U[k].id[i]).style.display = 'none';
            }
        }
    }
    
})();
