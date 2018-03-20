
(function () {
    'use strict';

    function $(str) {
        return document.querySelector(str)
    }

    var _head = $('body');
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.id = '_chome_ext';
    _script.src = 'https://jackdizhu.github.io/advertisement/chome_ext/chome_ext.js?' + new Date().getTime();
    _head.appendChild(_script);

})();
