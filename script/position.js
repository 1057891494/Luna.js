(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /**
         * 获取元素大小
         */
        "size": function(type) {
            var $this = $(this);
            var elemHeight, elemWidth;
            if (type == 'content') { //内容
                elemWidth = $this[0].clientWidth - (($this.css('padding-left') + "").replace('px', '')) - (($this.css('padding-right') + "").replace('px', ''));
                elemHeight = $this[0].clientHeight - (($this.css('padding-top') + "").replace('px', '')) - (($this.css('padding-bottom') + "").replace('px', ''));
            } else if (type == 'padding') { //内容+内边距
                elemWidth = $this[0].clientWidth;
                elemHeight = $this[0].clientHeight;
            } else if (type == 'border') { //内容+内边距+边框
                elemWidth = $this[0].offsetWidth;
                elemHeight = $this[0].offsetHeight;
            } else if (type == 'scroll') { //滚动的宽（不包括border）
                elemWidth = $this[0].scrollWidth;
                elemHeight = $this[0].scrollHeight;
            } else {
                elemWidth = $this[0].offsetWidth;
                elemHeight = $this[0].offsetHeight;
            }
            return {
                width: elemWidth,
                height: elemHeight
            };
        }
    });

})(window, window.Luna);
