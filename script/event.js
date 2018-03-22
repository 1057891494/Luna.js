(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /*添加绑定事件*/
        "bind": function(eventType, callback, useCapture) {
            var $$this = Luna(this),
                flag;
            if (window.attachEvent) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].attachEvent("on" + eventType, callback);
                }

            } else {
                //默认捕获
                useCapture = useCapture || false;
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].addEventListener(eventType, callback, useCapture);
                }
            }
            return $$this;
        },

        /*解除绑定事件*/
        "unbind": function(eventType, callback, useCapture) {
            var $$this = Luna(this),
                flag;
            if (window.detachEvent) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].detachEvent("on" + eventType, callback);
                }
            } else {
                //默认捕获
                useCapture = useCapture || false;
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].removeEventListener(eventType, callback, useCapture);
                }
            }
            return $$this;
        },

        /* 在特定元素上面触发特定事件*/
        "trigger": function(eventType, useCapture) {
            var $$this = Luna(this),
                event, flag;
            useCapture = useCapture || false;
            //创建event的对象实例。
            if (document.createEventObject) {
                // IE浏览器支持fireEvent方法
                event = document.createEventObject();
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].fireEvent('on' + eventType, event);
                }
            } else {
                // 其他标准浏览器使用dispatchEvent方法
                event = document.createEvent('HTMLEvents');
                // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
                event.initEvent(eventType, !useCapture, false);
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].dispatchEvent(event);
                }
            }
        },
        /*让元素获取焦点*/
        "focus": function() {
            var $$this = Luna(this);
            if ($$this.length > 0) {
                $$this[0].focus();
            }
            return $$this;
        },
        /*判断元素是否获取焦点*/
        "isFocus": function() {
            var $$this = Luna(this);
            return (!document.hasFocus || document.hasFocus()) && $$this.length > 0 && document.activeElement === $$this[0] && !!($$this[0].type || $$this[0].href || ~$$this[0].tabIndex);
        }
    });

    Luna.extend({
        /* 取消冒泡事件 */
        "cancelBubble": function(event) {
            var $$this = Luna(this);
            event = event || window.event;
            if (event && event.stopPropagation) { //这是其他非IE浏览器
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
            return $$this;
        },

        /* 阻止默认事件 */
        "preventDefault": function(event) {
            var $$this = Luna(this);
            event = event || window.event;
            if (event && event.stopPropagation) { //这是其他非IE浏览器
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            return $$this;
        }
    });
})(window, window.Luna);
