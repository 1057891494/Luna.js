(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /*添加绑定事件*/
        "bind": function(eventType, callback, useCapture) {
            var $this = Luna(this),
                flag;
            if (window.attachEvent) {
                for (flag = 0; flag < $this.length; flag++) {
                    $this[flag].attachEvent("on" + eventType, callback);
                }

            } else {
                //默认捕获
                useCapture = useCapture || false;
                for (flag = 0; flag < $this.length; flag++) {
                    $this[flag].addEventListener(eventType, callback, useCapture);
                }
            }
            return $this;
        },

        /*解除绑定事件*/
        "unbind": function(eventType, callback, useCapture) {
            var $this = Luna(this),
                flag;
            if (window.detachEvent) {
                for (flag = 0; flag < $this.length; flag++) {
                    $this[flag].detachEvent("on" + eventType, callback);
                }
            } else {
                //默认捕获
                useCapture = useCapture || false;
                for (flag = 0; flag < $this.length; flag++) {
                    $this[flag].removeEventListener(eventType, callback, useCapture);
                }
            }
            return $this;
        }
    });
})(window, window.Luna);
