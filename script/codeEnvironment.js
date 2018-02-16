(function(window, Luna, undefined) {
    'use strict';

    Luna.extend({
        /**
         * 切换到SVG模式
         */
        "SVG": function() {
            Luna._code_environment_ = 'SVG';
            return Luna(arguments[0], arguments[1], arguments[2]);
        },
        /**
         * 切换到HTML模式
         */
        "HTML": function() {
            Luna._code_environment_ = 'HTML';
            return Luna(arguments[0], arguments[1], arguments[2]);
        }
    });
})(window, window.Luna);
