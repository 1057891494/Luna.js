(function(window, Luna, undefined) {
    'use strict';

    Luna.extend({

        /**
         * 添加新的样式规则
         */
        "addStyle": function(select, rule) {
            if (document.styleSheets[0].insertRule) {
                //IE8-浏览器不支持
                document.styleSheets[0].insertRule(select + "" + rule, 0);
            } else if (document.styleSheets[0].addRule) {
                //firefox不支持但IE8-浏览器支持
                document.styleSheets[0].addRule(select, rule, 0);
            } else {
                Luna('body').append('<style>' + select + "" + rule + '</style>');
            }
        }
    });
})(window, window.Luna);
