
(function () {
    'use strict';
    var $ = window.document.querySelector;

    var _head = $('body');
    var _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.id = '_chome_ext';
    _script.src = 'https://jackdizhu.github.io/html_demo/cdn/chome_ext.js';
    _head.appendChild(_script);

    console.log('::chome_ext');

})();
