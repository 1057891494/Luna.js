(function (window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /**
         * 设置或获取内部html
         */
        "html": function (template) {
            var $$this = Luna(this);
            if ('' != template && !template) {
                return $$this[0].innerHTML;
            } else {
                var flag = 0;
                for (; flag < $$this.length; flag++) {
                    $$this[flag].innerHTML = template;
                }
                return $$this;
            }
        },

        /**
         * 设置或返回所选元素的文本内容
         */
        "text": function (val) {
            var $$this = Luna(this);
            if (!val) {
                return $$this[0].innerText;
            } else {
                var flag = 0;
                for (; flag < $$this.length; flag++) {
                    $$this[0].innerText = val;
                }
                return $$this;
            }
        },

        /**
         * 设置或返回表单字段的值
         */
        "val": function (val) {
            var $$this = Luna(this);
            if (!val) {
                return $$this[0].value;
            } else {
                var flag = 0;
                for (; flag < $$this.length; flag++) {
                    $$this[0].value = val;
                }
                return $$this;
            }
        },

        /**
         * 用于设置/改变属性值
         */
        "attr": function (attr, val) {
            var $$this = Luna(this);
            if (!val) {
                return $$this[0].getAttribute(attr);
            } else {
                var flag = 0;
                for (; flag < $$this.length; flag++) {
                    if (Luna._code_environment_ == 'SVG' && Luna._SVG_config_.xlink[attr]) {
                        $$this[flag].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:' + attr, val);
                    } else {
                        $$this[flag].setAttribute(attr, val);
                    }
                }
                return $$this;
            }
        },

        /**
         * 判断是否存在指定的class
         */
        "hasClass": function (val) {
            var $$this = Luna(this[0]);
            if (typeof val === "string" && val) {
                if ((" " + $$this.class() + " ").search(" " + val + " ") >= 0) {
                    return true;
                }
            }
            return false;
        },

        /**
         * 向被选元素添加一个或多个类
         */
        "addClass": function (val) {
            var $$this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $$this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var uniqueClass = Luna.uniqueClass(curClass, val);
                    node.setAttribute('class', uniqueClass);
                    node = $$this[i++];
                }
            }
            return $$this;
        },

        /**
         * 从被选元素删除一个或多个类
         */
        "removeClass": function (val) {
            var $$this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $$this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Luna.operateClass(curClass, val, true);
                    node.setAttribute('class', resultClass);
                    node = $$this[i++];
                }
            }
            return $$this;
        },

        /**
         * 对被选元素进行添加/删除类的切换操作
         */
        "toggleClass": function (val) {
            var $$this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $$this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Luna.operateClass(curClass, val);
                    node.setAttribute('class', resultClass);
                    node = $$this[i++];
                }
            }
            return $$this;
        },

        /**
         * 设置或获取class
         */
        "class": function (val) {
            var $$this = Luna(this);
            var node;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $$this[i++];
                while (node) {
                    node.setAttribute('class', Luna.uniqueClass(val));
                    node = $$this[i++];
                }
            } else {
                return $$this[0].getAttribute('class') || '';
            }
            return $$this;
        },

        /**
         * 设置或返回被选元素的一个样式属性
         */
        "css": function (name, style) {
            var $$this = Luna(this),
                flag;
            if (typeof name === 'string' && arguments.length === 1) {
                return Luna.styles($$this[0], name);
            }
            if (typeof name === 'string' && typeof style === 'string') {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].style[name] = style;
                }
            } else if (typeof name === 'object') {
                for (var key in name) {
                    for (flag = 0; flag < $$this.length; flag++) {
                        $$this[flag].style[key] = name[key];
                    }
                }
            } else {
                return Luna.styles($$this[0]);
            }
            return $$this;
        },

        /**
         * 在被选元素内部的结尾插入内容
         */
        "append": function (node) {
            var $$this = Luna(this),
                flag;
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].appendChild(node);
                }
            } else if (node.isTouch) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].appendChild(node[0]);
                }
            } else if (typeof node == 'string') {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].appendChild(Luna(node)[0]);
                }
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素内部的开头插入内容
         */
        "prepend": function (node) {
            var $$this = Luna(this),
                flag;
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].insertBefore(node, $$this[0].childNodes[0]);
                }
            } else if (node.isTouch) {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].insertBefore(node[0], $$this[0].childNodes[0]);
                }
            } else if (typeof node == 'string') {
                for (flag = 0; flag < $$this.length; flag++) {
                    $$this[flag].insertBefore(Luna(node)[0], $$this[0].childNodes[0]);
                }
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素之后插入内容
         */
        "after": function (node) {
            var $$this = Luna(this),
                flag, $$parent;
            for (flag = 0; flag < $$this.length; flag++) {
                $$parent = $$this[flag].parentNode || Luna('body')[0];
                if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                    $$parent.insertBefore(node, $$this[flag].nextSibling); //如果第二个参数undefined,在结尾追加，目的一样达到
                } else if (node.isTouch) {
                    $$parent.insertBefore(node[0], $$this[flag].nextSibling);
                } else if (typeof node == 'string') {
                    $$parent.insertBefore(Luna(node)[0], $$this[flag].nextSibling);
                } else {
                    throw new Error("Not acceptable type!");
                }
            }
            return $$this;
        },

        /**
         * 在被选元素之前插入内容
         */
        "before": function (node) {
            var $$this = Luna(this),
                $$parent, flag;
            for (flag = 0; flag < $$this.length; flag++) {
                $$parent = $$this[flag].parentNode || Luna('body')[0];
                if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                    $$parent.insertBefore(node, $$this[flag]);
                } else if (node.isTouch) {
                    $$parent.insertBefore(node[0], $$this[flag]);
                } else if (typeof node == 'string') {
                    $$parent.insertBefore(Luna(node)[0], $$this[flag]);
                } else {
                    throw new Error("Not acceptable type!");
                }
            }
            return $$this;
        },

        /**
         * 删除被选元素（及其子元素）
         */
        "remove": function () {
            var $$this = Luna(this),
                flag, $$parent;
            for (flag = 0; flag < $$this.length; flag++) {
                $$parent = Luna($$this[flag]).parent();
                $$parent[0].removeChild($$this[flag]);
            }
            return $$this;
        },

        /**
         * 从被选元素中删除子元素
         */
        "empty": function () {
            var $$this = Luna(this),
                flag;
            for (flag = 0; flag < $$this.length; flag++) {
                Luna($$this[flag]).html('');
            }
            return $$this;
        },
        /**
         * 进入全屏
         */
        "launchFullScreen": function () {
            var $$this = Luna(this);
            if ($$this[0] && $$this[0].requestFullScreen) {
                $$this[0].requestFullScreen();
            } else if ($$this[0] && $$this[0].mozRequestFullScreen) {
                $$this[0].mozRequestFullScreen();
            } else if ($$this[0] && $$this[0].webkitRequestFullScreen) {
                $$this[0].webkitRequestFullScreen();
            }
            return $$this;
        }
    });

})(window, window.Luna);
