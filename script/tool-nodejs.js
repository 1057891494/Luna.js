(function(noGlobal, window, Luna, undefined) {
    'use strict';

    if (!noGlobal) {
        return window;
    }

    Luna.extend({
         /**
         * 把指定文字复制到剪切板
         */
        'clipboard': function(text, callback, errorback) {

        }

    });
})(typeof window !== "undefined" ? false : true, typeof window !== "undefined" ? window : this, (typeof window !== "undefined" ? window : this).Luna);
