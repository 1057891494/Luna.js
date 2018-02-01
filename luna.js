/*! 
====================================
    个人内部使用的小型js工具库
    心叶
    V0.0.1-alpha
    最后修改于：2018-02-01
====================================
*/
(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Luna requires a window with a document!");
    }

})(window, function(window, undefined) {
    'use strict';

    var Luna = function(selector, context) {
        return new Luna.prototype.init(selector, context);
    };

    /**
     * @param selector [string,function,dom,Luna Object] 选择器
     * @param context [dom,Luna Object] 查找上下文，默认document
     *
     * @return Luna Object
     * {
     *  [],//查找的结果保存在数组中
     *  context,//查找时使用的上下文
     *  length,//查找回来的个数
     *  isTouch//返回是否是已经查找过的结点
     *  selector//选择器
     * }
     */
    Luna.prototype.init = function(selector, context, root) {

        //准备工作
        if (typeof selector === 'string') {
            selector = (selector + "").trim();
        }

        var flag;
        this.length = 0;
        root = root || rootLuna;

        if (!context) {
            context = document;
        } else {
            context = Luna(context)[0];
        }

        //选择器: $(""), $(null), $(undefined), $(false)，兼容一下
        if (!selector) {
            return this;　　
        } else {
            this.selector = selector;
        }

        //body比较特殊，直接提出来
        if (selector == "body") {
            this.context = document;
            this[0] = document.body;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是字符串
        if (typeof selector === 'string') {
            //去掉：换行，换页，回车
            selector = (selector + "").trim().replace(/[\n\f\r]/g, '');
            if (/^</.test(selector)) {
                //如果是html文档
                if (!context) {
                    throw new Error("Parameter error!");
                }
                var frameDiv = document.createElement("div");
                frameDiv.innerHTML = selector;
                this[0] = frameDiv.childNodes[0];
                this.isTouch = true;
                this.length = 1;
                this.context = undefined;
                return this;
            } else {
                //内置小型sizzle选择器
                if (!Luna.doSelector) {
                    throw new Error("Sizzle is necessary for Luna!");
                }
                var nodes = Luna.sizzle(selector, context);
                flag = 0;
                for (; flag < nodes.length; flag++) {
                    this[flag] = nodes[flag];
                }
                this.length = flag;
                this.isTouch = true;
                this.context = context;
                return this;
            }
        }
        //如果是DOM节点
        if (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9) {
            this.context = context;
            this[0] = selector;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是function
        if (typeof selector === 'function') {
            if (Luna.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {
                    //Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        Luna.__isLoad__ = true;
                    });

                } else if (document.attachEvent) {
                    //IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            Luna.__isLoad__ = true;
                        }
                    });

                }
            }
            return this;
        }

        //如果是Luna对象
        if (selector.isTouch) {
            this.isTouch = true;
            flag = 0;
            for (; flag < selector.length; flag++) {
                this[flag] = selector[flag];
            }
            this.context = selector.context || context;
            this.length = selector.length;
            this.selector = selector.selector;
            return this;
        }

        return this;

    };

    var rootLuna = Luna(document);

    Luna.prototype.extend = Luna.extend = function() {

        var target = arguments[0] || {};
        var source = arguments[1] || {};
        var length = arguments.length;

        /*
         * 确定复制目标和源
         */
        if (length === 1) {
            //如果只有一个参数，目标对象是自己
            source = target;
            target = this;
        }
        if (typeof target !== "object" && typeof target !== 'function') {
            //如果目标不是对象或函数，则初始化为空对象
            target = {};
        }

        /*
         * 复制属性到对象上面
         */
        for (var key in source) {
            try {
                target[key] = source[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        }

        return target;
    };

    Luna.prototype.init.prototype = Luna.prototype;

    Luna.__isLoad__ = false;

    window.Luna = window.$ = Luna;

});

(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /*添加绑定事件*/
        "bind": function(eventType, callback, useCapture) {
            var $this = Luna(this);
            if (window.attachEvent) {
                $this[0].attachEvent("on" + eventType, callback);
            } else {
                //默认捕获
                useCapture = useCapture || false;
                $this[0].addEventListener(eventType, callback, useCapture);
            }
            return $this;
        },

        /*解除绑定事件*/
        "unbind": function(eventType, callback, useCapture) {
            var $this = Luna(this);
            if (window.detachEvent) {
                $this[0].detachEvent("on" + eventType, callback);
            } else {
                //默认捕获
                useCapture = useCapture || false;
                $this[0].removeEventListener(eventType, callback, useCapture);
            }
            return $this;
        }
    });
})(window, window.Luna);

(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /**
         * 设置或获取内部html
         */
        "html": function(template) {
            var $this = Luna(this);
            if ('' != template && !template) {
                return $this[0].innerHTML;
            } else {
                $this[0].innerHTML = template;
                return $this;
            }
        },

        /**
         * 设置或返回所选元素的文本内容
         */
        "text": function(val) {
            var $this = Luna(this);
            if (!val) {
                return $this[0].innerText;
            }
            $this[0].innerText = val;
            return $this;
        },

        /**
         * 设置或返回表单字段的值
         */
        "val": function(val) {
            var $this = Luna(this);
            if (!val) {
                return $this[0].value;
            }
            $this[0].value = val;
            return $this;
        },

        /**
         * 用于设置/改变属性值
         */
        "attr": function(attr, val) {
            var $this = Luna(this);
            if (!val) {
                return $this[0].getAttribute(attr);
            }

            $this[0].setAttribute(attr, val);
            return $this;
        },

        /**
         * 向被选元素添加一个或多个类
         */
        "addClass": function(val) {
            var $this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var uniqueClass = Luna.uniqueClass(curClass, val);
                    node.setAttribute('class', uniqueClass);
                    node = $this[i++];
                }
            }
            return $this;
        },

        /**
         * 从被选元素删除一个或多个类
         */
        "removeClass": function(val) {
            var $this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Luna.operateClass(curClass, val, true);
                    node.setAttribute('class', resultClass);
                    node = $this[i++];
                }
            }
            return $this;
        },

        /**
         * 对被选元素进行添加/删除类的切换操作
         */
        "toggleClass": function(val) {
            var $this = Luna(this);
            var node;
            var curClass;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $this[i++];
                while (node) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Luna.operateClass(curClass, val);
                    node.setAttribute('class', resultClass);
                    node = $this[i++];
                }
            }
            return $this;
        },

        /**
         * 设置或获取class
         */
        "class": function(val) {
            var $this = Luna(this);
            var node;
            if (typeof val === "string" && val) {
                var i = 0;
                node = $this[i++];
                while (node) {
                    node.setAttribute('class', Luna.uniqueClass(val));
                    node = $this[i++];
                }
            } else {
                return $this[0].getAttribute('class') || '';
            }
            return $this;
        },

        /**
         * 设置或返回被选元素的一个样式属性
         */
        "css": function(name, style) {
            var $this = Luna(this);
            if (typeof name === 'string' && arguments.length === 1) {
                return $this[0].style[name];
            }
            if (typeof name === 'string' && typeof style === 'string') {
                $this[0].style[name] = style;
            } else if (typeof name === 'object') {
                for (var key in name) {
                    $this[0].style[key] = name[key];
                }
            } else {
                throw new Error("Not acceptable type!");
            }
            return $this;
        },

        /**
         * 在被选元素内部的结尾插入内容
         */
        "append": function(node) {
            var $this = Luna(this);
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $this[0].appendChild(node);
            } else if (node.isTouch) {
                $this[0].appendChild(node[0]);
            } else if (typeof node == 'string') {
                $this[0].appendChild(Luna(node)[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $this;
        },

        /**
         * 在被选元素内部的开头插入内容
         */
        "prepend": function(node) {
            var $this = Luna(this);
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $this[0].insertBefore(node, $this[0].childNodes[0]);
            } else if (node.isTouch) {
                $this[0].insertBefore(node[0], $this[0].childNodes[0]);
            } else if (typeof node == 'string') {
                $this[0].insertBefore(Luna(node)[0], $this[0].childNodes[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $this;
        },

        /**
         * 在被选元素之后插入内容
         */
        "after": function(node) {
            var $this = Luna(this);
            var $parent = $this[0].parentNode || Luna('body')[0];
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $parent.insertBefore(node, $this[0].nextSibling); //如果第二个参数undefined,在结尾追加，目的一样达到
            } else if (node.isTouch) {
                $parent.insertBefore(node[0], $this[0].nextSibling);
            } else if (typeof node == 'string') {
                $parent.insertBefore(Luna(node)[0], $this[0].nextSibling);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $this;
        },

        /**
         * 在被选元素之前插入内容
         */
        "before": function(node) {
            var $this = Luna(this);
            var $parent = $this[0].parentNode || Luna('body')[0];
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $parent.insertBefore(node, $this[0]);
            } else if (node.isTouch) {
                $parent.insertBefore(node[0], $this[0]);
            } else if (typeof node == 'string') {
                $parent.insertBefore(Luna(node)[0], $this[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $this;
        },

        /**
         * 删除被选元素（及其子元素）
         */
        "remove": function() {
            var $this = Luna(this);
            var $parent = $this[0].parentNode || Luna('body')[0];
            $parent.removeChild($this[0]);
            return $this;
        },

        /**
         * 从被选元素中删除子元素
         */
        "empty": function() {
            var $this = Luna(this);
            $this.html('');
            return $this;
        }
    });

})(window, window.Luna);

(function(window, Luna, undefined) {
    'use strict';

    Luna.extend({

        /*一个小型的sizzle.js选择器*/
        "sizzle": function(selector, context) {
            throw new Error('开发中......');
        }
    });
})(window, window.Luna);

(function(window, Luna, undefined) {
    'use strict';

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
        }
    });
})(window, window.Luna);
