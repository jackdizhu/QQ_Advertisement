
// 02
(function() {
    'use strict';
    console.log('::chome_ext');
    var _time;
    function is_empty(_this) {
        var ht = _this.innerHTML;
        if(ht != ''){
            index();
        }else{
            clearTimeout(_time);
        }
    }
    function index() {
        var u = window.location.href;
        var U = {
            baidu:{
                R: 'baidu.com',
                id:['content_right']
            }
        };
        var R,k,_this;
        for(k in U){
            R = new RegExp("^http[s]?:\/\/[a-z.]+"+U[k].R+"");
            if(R.test(u)){
                for(var i = 0;i<U[k].id.length;i++){
                    if(document.getElementById(U[k].id[i])){
                        // document.getElementById(U[k].id[i]).style.display = 'none';
                        console.log('--:#'+U[k].id[i]+'--');
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
