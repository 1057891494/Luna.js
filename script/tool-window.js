(function(noGlobal, window, Luna, undefined) {
    'use strict';

    if (noGlobal) {
        return window;
    }

    Luna.extend({

        /**
         * 获取包括元素自己的字符串
         */
        "outerHTML": function(node) {
            return node.outerHTML || (function(n) {
                var div = document.createElement('div'),
                    h;
                div.appendChild(n);
                h = div.innerHTML;
                div = null;
                return h;
            })(node);
        },

        /**
         * 合并若干个class
         */
        "uniqueClass": function() {
            var classString = '',
                flag = 0;
            for (; flag < arguments.length; flag++) {
                if (typeof arguments[flag] !== 'string') {
                    throw new Error('Only string is valid,not project!');
                }
                classString += arguments[flag] + " ";
            }
            classString = classString.trim();
            var classArray = classString.split(/ +/);
            var classObj = {};
            classArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        },

        /**
         * 删除已经存在的class或toggle，用flag来标记，flag为真表示删除
         */
        "operateClass": function(srcClass, opeClass, flag) {
            if (typeof srcClass !== 'string' || typeof opeClass !== 'string') {
                throw new Error('Only string is valid,not project!');
            }
            srcClass = srcClass.trim();
            opeClass = opeClass.trim();
            var srcClassArray = srcClass.split(/ +/);
            var opeClassArray = opeClass.split(/ +/);
            var classObj = {};
            srcClassArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            opeClassArray.forEach(function(item) {
                classObj[item] = flag ? false : !classObj[item];
            }, this);
            var classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        },
        /**
         * 获取全部样式
         */
        'styles': function(dom, name) {
            if (arguments.length < 1 || (dom.nodeType !== 1 && dom.nodeType !== 11 && dom.nodeType !== 9)) {
                throw new Error('DOM is required!');
            }
            if (document.defaultView && document.defaultView.getComputedStyle) {
                if (name && typeof name === 'string') {
                    return document.defaultView.getComputedStyle(dom, null).getPropertyValue(name); //第二个参数是伪类
                } else {
                    return document.defaultView.getComputedStyle(dom, null);
                }
            } else {
                if (name && typeof name === 'string') {
                    return dom.currentStyle.getPropertyValue(name);
                } else {
                    return dom.currentStyle;
                }
            }
        },
        /**
         * 把指定文字复制到剪切板
         */
        'clipboard': function(text, callback, errorback) {
            $('body').prepend(Luna('<textarea id="clipboard-textarea" style="position:absolute">' + text + '</textarea>')[0]);
            window.document.getElementById("clipboard-textarea").select();
            try {
                window.document.execCommand("copy", false, null);
                if (!!callback) {
                    callback();
                }
            } catch (e) {
                if (!!errorback) {
                    errorback();
                }
            }
            $('#clipboard-textarea').remove();
        },

        /**
         * 退出全屏
         */
        "exitFullScreen": function() {
            document.exitFullscreen ? document.exitFullscreen() :
                document.mozCancelFullScreen ? document.mozCancelFullScreen() :
                document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
        }
    });
})(typeof window !== "undefined" ? false : true, typeof window !== "undefined" ? window : this, (typeof window !== "undefined" ? window : this).Luna);
