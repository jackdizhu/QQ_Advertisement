(function () {

    function init() {
        var is = $('#js_ext').length;
        if(!is){
            var head = $('head');
            var s = '<script type="text/javascript" id="js_ext" src="./U_js.js"></script>';
            head.append(s);
        }
    }

    window.document.addEventListener("DOMContentLoaded", init, false);
    // window.document.addEventListener("dom:loaded", init, false);

}());

